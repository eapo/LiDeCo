/* eslint-disable dot-notation */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { _ } from 'meteor/underscore';
import { moment } from 'meteor/momentjs:moment';

import { crudBatchOps, BatchMethod } from '/imports/api/batch-method.js';
import { checkExists, checkNotExists, checkPermissions, checkTopicPermissions, checkModifier } from '/imports/api/method-checks.js';
import '/imports/api/users/users.js';
import { Comments } from '/imports/api/comments/comments.js';
import { Communities } from '/imports/api/communities/communities.js';
import { Topics } from './topics.js';
import { Attachments } from '/imports/api/attachments/attachments.js';
// In order for Topics.simpleSchema to be the full schema to validate against, we need all subtype schema
import './votings/votings.js';
import './tickets/tickets.js';
import { updateMyLastSeen, mergeLastSeen } from '/imports/api/users/methods.js';
import './rooms/rooms.js';
import './feedbacks/feedbacks.js';
import { autoOpen } from './votings/methods.js';

export const insert = new ValidatedMethod({
  name: 'topics.insert',
  validate: doc => Topics.simpleSchema(doc).validator({ clean: true })(doc),
  run(doc) {
    if (doc._id) checkNotExists(Topics, doc._id);
    doc = Topics._transform(doc);
    // readableId(Topics, doc);
    checkTopicPermissions(this.userId, 'insert', doc);
    const topicId = Topics.insert(doc);
    if (Meteor.isServer) {
      const newTopic = Topics.findOne(topicId); // we need the createdAt timestamp from the server
      autoOpen(newTopic);
      updateMyLastSeen._execute({ userId: this.userId },
      { topicId, lastSeenInfo: { timestamp: newTopic.createdAt } });
    }
    return topicId;
  },
});

export const update = new ValidatedMethod({
  name: 'topics.update',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    modifier: { type: Object, blackbox: true },
  }).validator(),
  run({ _id, modifier }) {
    const topic = checkExists(Topics, _id);
    checkTopicPermissions(this.userId, 'update', topic);
    checkModifier(topic, modifier, topic.modifiableFields());
    Topics.update(_id, modifier, { selector: { category: topic.category } });
  },
});

export const move = new ValidatedMethod({
  name: 'topics.move',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    destinationId: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ _id, destinationId }) {
    const doc = checkExists(Topics, _id);
    if (doc.category !== 'forum') throw new Meteor.Error('err_permissionDenied', 'Only forum topic may be moved');
    checkPermissions(this.userId, 'comment.move', doc);
    if (Meteor.isServer) {
      const community = Communities.findOne(doc.communityId);
      community.users().forEach((user) => {
        mergeLastSeen(user, doc._id, destinationId);
      });
    }
    const movedDoc = _.extend({}, doc, {
      category: 'comment',
      topicId: destinationId,
    });
    Comments.direct.insert(movedDoc); // timestamped hooks should not run
    // Comments._hookAspects.insert.after[0].aspect(this.userId, movedDoc);
    doc.attachments?.forEach(path => {
      Attachments.direct.update({ communityId: doc.communityId, path },
        { $set: { parentId: destinationId, parentCollection: 'Comments' } });
    });
    Topics.update(destinationId, { $inc: { commentCounter: 1 } });
    doc.comments().forEach((comment) => {
      Comments.update(comment._id, { $set: { topicId: destinationId } });
    });
    Topics.update(_id, { $set: { movedTo: destinationId, status: 'deleted' } }, { selector: doc });
  },
});

export const archive = new ValidatedMethod({
  name: 'topics.archive',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ _id }) {
    const topic = checkExists(Topics, _id);
    checkTopicPermissions(this.userId, 'remove', topic);
    Topics.update(_id, { $set: { closed: true } }, { selector: { category: topic.category } });
  },
});

export const remove = new ValidatedMethod({
  name: 'topics.remove',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
  }).validator(),
  run({ _id }) {
    const topic = checkExists(Topics, _id);
    checkTopicPermissions(this.userId, 'remove', topic);

    Topics.remove(_id);
    Comments.remove({ topicId: _id });
  },
});

export function closeInactiveTopics() {
  const exceptCategories = ['ticket'];
  Communities.find({}).forEach(community => {
    const localAdminId = community.admin()._id;
    const topicAgeDays = community.settings.topicAgeDays;
    const archiveTime = moment().subtract(topicAgeDays, 'days').toDate();
    const closableTopics = Topics.find({ communityId: community._id, category: { $nin: exceptCategories }, closed: false, updatedAt: { $lt: archiveTime } });
    closableTopics.forEach((topic) => {
      Topics.methods.update._execute({ userId: localAdminId }, { _id: topic._id, modifier: { $set: { closed: true } } });
    });
  });
}

Topics.methods = Topics.methods || {};
_.extend(Topics.methods, { insert, update, move, archive, remove });
_.extend(Topics.methods, crudBatchOps(Topics));
Meteor.startup(() => { // statusUpdate is a behaviour method -- not ready yet
  Topics.methods.batch.statusUpdate = new BatchMethod(Topics.methods.statusUpdate);
});

// ----- RATE LIMITING --------

// Get list of all method names on Topics
const TOPICS_METHOD_NAMES = _.pluck([insert, update, move, remove], 'name');
// TODO: don't differentiate, overall rate limit needed

if (Meteor.isServer) {
  // Only allow 5 topic operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(TOPICS_METHOD_NAMES, name);
    },

    // Rate limit per connection ID
    connectionId() { return true; },
  }, 5, 1000);
}
