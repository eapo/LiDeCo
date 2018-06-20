import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { insertBreakdownTemplate } from '/imports/api/journals//template.js';
import { Memberships } from '/imports/api/memberships/memberships.js';
import { Communities } from './communities.js';
import { checkLoggedIn, checkExists, checkNotExists, checkPermissions, checkModifier } from '../method-checks.js';

export const create = new ValidatedMethod({
  name: 'communities.create',
  validate: Communities.simpleSchema().validator({ clean: true }),

  run(doc) {
    checkLoggedIn(this.userId);
    checkNotExists(Communities, { name: doc.name });
    const communityId = Communities.insert(doc);
    
    insertBreakdownTemplate(communityId);
    // The user creating the community, becomes the first 'admin' of it.
    Memberships.insert({ communityId, person: { userId: this.userId }, role: 'admin' });
    return communityId;
  },
});

export const update = new ValidatedMethod({
  name: 'communities.update',
  validate: new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    modifier: { type: Object, blackbox: true },
  }).validator(),

  run({ _id, modifier }) {
    const doc = checkExists(Communities, _id);
    checkModifier(doc, modifier, ['name'], true);     // all fields are modifiable except name
    checkPermissions(this.userId, 'communities.update', _id);
    Communities.update({ _id }, modifier);
  },
});
