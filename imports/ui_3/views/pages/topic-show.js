

import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { __ } from '/imports/localization/i18n.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Topics } from '/imports/api/topics/topics.js';

import '../common/error.js';
import '../common/page-heading.js';
import '../components/chatbox.js';
import '../components/ticketbox.js';
import '../components/votebox.js';
import '../components/comments-section.js';
import '../components/revision-history.js';
import './topic-show.html';

Template.Topic_show.onCreated(function topicShowOnCreated() {
  const topicId = FlowRouter.getParam('_tid');
  this.subscribe('topics.byId', { _id: topicId });  // brings all comments with it
  this.autorun(() => {
    const topic = Topics.findOne(topicId);
    if (topic) this.subscribe('memberships.inCommunity', { communityId: topic.communityId });
  });
});

Template.Topic_show.helpers({
  topic() {
    const topic = Topics.findOne(FlowRouter.getParam('_tid'));
    return topic;
  },
  pageTitle() {
    return __('topic.' + this.category) + ' ' + __('details');
  },
  smallTitle() {
    return this.title;
  },
  pageCrumbs() {
    switch (this.category) {
      case 'vote': {
        return [{
          title: __('Votings'),
          url: FlowRouter.path('Topics.vote'),
        }];
      }
      case 'forum': {
        return [{
          title: __('Forum'),
          url: FlowRouter.path('Topics.forum'),
        }];
      }
      case 'ticket': {
        return [{
          title: __('Tickets'),
          url: FlowRouter.path('Tickets.report'),
        }];
      }
      default: return [];
    }
  },
});

Template.Ticket_topic_show.helpers({
  statusColor(value) {
    return Topics.statusColors[value];
  },
  urgencyColor(value) {
    return Topics.urgencyColors[value];
  },
});
