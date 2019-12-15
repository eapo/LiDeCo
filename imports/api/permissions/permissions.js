/* eslint-disable no-multi-spaces */
import { _ } from 'meteor/underscore';
import { exceptGuest, everyRole, everyBody, nobody } from './roles.js';

export const Permissions = [
  { name: 'communities.details',    roles: exceptGuest },
//  { name: 'communities.insert',     roles: everyRole },
  { name: 'communities.update',     roles: ['admin'] },
  { name: 'communities.remove',     roles: ['admin'] },
  { name: 'memberships.inCommunity', roles: everyRole },
  { name: 'memberships.details',    roles: ['manager'] },
  { name: 'memberships.upsert',     roles: ['manager'] },
  { name: 'roleship.insert',       roles: ['admin'] },
  { name: 'roleship.update',       roles: ['admin'] },
  { name: 'roleship.remove',       roles: ['admin'] },
  { name: 'ownership.insert',      roles: ['manager'] },
  { name: 'ownership.update',      roles: ['manager'] },
  { name: 'ownership.remove',      roles: ['manager'] },
  { name: 'benefactorship.insert', roles: ['manager'] },
  { name: 'benefactorship.update', roles: ['manager'] },
  { name: 'benefactorship.remove', roles: ['manager'] },
  { name: 'delegate.insert',        roles: ['manager'] },
  { name: 'delegate.update',        roles: ['manager'] },
  { name: 'delegate.remove',        roles: ['manager'] },
  { name: 'parcels.inCommunity',    roles: everyRole },
  { name: 'parcels.details',        roles: ['owner', 'benefactor'] },
  { name: 'parcels.finances',       roles: ['manager', 'accountant', 'treasurer', 'owner'] },
  { name: 'parcels.insert',         roles: ['manager'] },
  { name: 'parcels.update',         roles: ['manager'] },
  { name: 'parcels.remove',         roles: ['manager'] },
  { name: 'parcels.upsert',         roles: ['manager'] },
  { name: 'meters.inCommunity',     roles: ['manager', 'owner'] },
  { name: 'meters.insert',          roles: ['manager'] },
  { name: 'meters.insert.unapproved',roles: ['owner'] },
  { name: 'meters.update',          roles: ['manager'] },
  { name: 'meters.registerReading', roles: ['owner'] },
  { name: 'meters.remove',          roles: ['manager'] },
  { name: 'meters.upsert',          roles: ['manager'] },
  { name: 'leaderships.inCommunity',     roles: exceptGuest },
  { name: 'leaderships.insert',     roles: ['manager'] },
  { name: 'leaderships.update',     roles: ['manager'] },
  { name: 'leaderships.remove',     roles: ['manager'] },
  { name: 'leaderships.upsert',     roles: ['manager'] },
  { name: 'agendas.inCommunity',    roles: everyRole },
  { name: 'agendas.insert',         roles: ['manager'] },
  { name: 'agendas.update',         roles: ['manager'] },
  { name: 'agendas.remove',         roles: ['manager'] },
  { name: 'contracts.inCommunity',  roles: everyRole },
  { name: 'contracts.insert',       roles: ['manager'] },
  { name: 'contracts.update',       roles: ['manager'] },
  { name: 'contracts.remove',       roles: ['manager'] },
  { name: 'topics.inCommunity',     roles: exceptGuest },
  { name: 'topics.upsert',          roles: ['manager'] },
  { name: 'forum.insert',           roles: exceptGuest },
  { name: 'forum.update',           roles: nobody, allowAuthor: true },
  { name: 'forum.remove',           roles: ['moderator'], allowAuthor: true },
  { name: 'news.insert',            roles: ['manager'] },
  { name: 'news.update',            roles: ['manager'] },
  { name: 'news.remove',            roles: ['manager'] },
  { name: 'poll.insert',            roles: ['admin', 'manager', 'owner'] },
  { name: 'poll.update',            roles: nobody, allowAuthor: true },
  { name: 'poll.remove',            roles: nobody, allowAuthor: true },
  { name: 'vote.insert',            roles: ['manager'] },
  { name: 'vote.update',            roles: nobody, allowAuthor: true },
  { name: 'vote.remove',            roles: nobody, allowAuthor: true },
  { name: 'vote.cast',              roles: exceptGuest }, // ['owner', 'delegate', 'manager'] },
  { name: 'vote.castForOthers',     roles: ['admin'] },
  //{ name: 'vote.close',             roles: ['manager'] },
  { name: 'vote.peek',              roles: ['manager'] },
  { name: 'ticket.insert',          roles: exceptGuest },
  { name: 'ticket.update',          roles: ['manager'], allowAuthor: true },
  { name: 'ticket.remove',          roles: nobody, allowAuthor: true },
  { name: 'issue.insert',           roles: exceptGuest },
  { name: 'issue.update',           roles: exceptGuest },
  { name: 'issue.remove',           roles: exceptGuest },
  { name: 'upgrade.insert',         roles: ['manager'] },
  { name: 'upgrade.update',         roles: ['manager'] },
  { name: 'upgrade.remove',         roles: ['manager'] },
  { name: 'maintenance.insert',     roles: ['manager', 'maintainer'] },
  { name: 'maintenance.update',     roles: ['manager', 'maintainer'] },
  { name: 'maintenance.remove',     roles: ['manager', 'maintainer'] },
  { name: 'room.insert',            roles: everyRole },
  { name: 'room.update',            roles: nobody },
  { name: 'feedback.insert',        roles: everyRole },
  { name: 'feedback.update',        roles: nobody },
  { name: 'events.inCommunity',     roles: exceptGuest },
  { name: 'comment.insert',         roles: exceptGuest },
  { name: 'comment.update',         roles: nobody, allowAuthor: true },
  { name: 'comment.move',           roles: ['moderator'], allowAuthor: true },
  { name: 'comment.remove',         roles: ['moderator'], allowAuthor: true },
  { name: 'pointAt.insert',         roles: exceptGuest },
  { name: 'pointAt.update',         roles: nobody, allowAuthor: true },
  { name: 'pointAt.remove',         roles: nobody, allowAuthor: true },
  { name: 'like.toggle',            roles: exceptGuest },
  { name: 'flag.toggle',            roles: exceptGuest },
  { name: 'flag.forOthers',         roles: ['moderator'] },
  { name: 'delegations.inCommunity',roles: ['manager'] },
  { name: 'delegations.forOthers',  roles: ['manager'] },
  { name: 'delegations.insert',     roles: exceptGuest },
  { name: 'delegations.update',     roles: nobody, allowAuthor: true },
  { name: 'delegations.remove',     roles: nobody, allowAuthor: true },
  { name: 'finances.view',          roles: exceptGuest },
  { name: 'breakdowns.inCommunity', roles: exceptGuest },
  { name: 'breakdowns.insert',      roles: ['accountant'] },
  { name: 'breakdowns.update',      roles: ['accountant'] },
  { name: 'breakdowns.remove',      roles: ['accountant'] },
  { name: 'balances.ofAccounts',    roles: ['manager', 'accountant', 'treasurer', 'overseer', 'owner'] },
  { name: 'balances.ofLocalizers',  roles: ['manager', 'accountant', 'treasurer', 'overseer'] },
  { name: 'balances.insert',        roles: ['manager', 'accountant', 'treasurer'] },
  { name: 'balances.upsert',        roles: ['manager'] },
  { name: 'balances.publish',       roles: ['manager', 'accountant', 'treasurer'] },
  { name: 'txCats.inCommunity',     roles: exceptGuest },
  { name: 'transactions.inCommunity',roles: ['manager', 'accountant', 'treasurer', 'overseer'] },
  { name: 'transactions.insert',    roles: ['manager', 'accountant', 'treasurer'] },
  { name: 'transactions.update',    roles: ['manager', 'accountant', 'treasurer'] },
  { name: 'transactions.post',      roles: ['manager', 'accountant', 'treasurer'] },
  { name: 'transactions.reconcile', roles: ['manager', 'accountant', 'treasurer'] },
  { name: 'transactions.remove',    roles: ['manager', 'accountant', 'treasurer'] },
  { name: 'transactions.upsert',    roles: ['manager'] },
  { name: 'bills.outstanding',      roles: ['manager', 'accountant', 'treasurer'] },
  { name: 'partners.inCommunity',   roles: exceptGuest },
  { name: 'partners.insert',        roles: ['manager', 'accountant', 'treasurer'] },
  { name: 'partners.update',        roles: ['manager', 'accountant', 'treasurer'] },
  { name: 'partners.remove',        roles: ['manager', 'accountant', 'treasurer'] },
  { name: 'partners.upsert',        roles: ['manager'] },
  { name: 'parcelBillings.inCommunity', roles: ['manager', 'accountant', 'treasurer', 'overseer'] },
  { name: 'parcelBillings.insert',  roles: ['manager', 'accountant'] },
  { name: 'parcelBillings.update',  roles: ['manager', 'accountant'] },
  { name: 'parcelBillings.remove',  roles: ['manager', 'accountant'] },
  { name: 'parcelBillings.apply',   roles: ['manager', 'accountant', 'treasurer'] },
  { name: 'parcelBillings.revert',  roles: ['manager', 'accountant'] },
  { name: 'statements.inCommunity', roles: ['manager', 'accountant', 'treasurer', 'overseer'] },
  { name: 'statements.insert',      roles: ['manager', 'accountant', 'treasurer'] },
  { name: 'statements.update',      roles: ['manager', 'accountant'] },
  { name: 'statements.reconcile',   roles: ['manager', 'accountant', 'treasurer'] },
  { name: 'statements.remove',      roles: ['manager', 'accountant'] },
  { name: 'shareddocs.upload',      roles: ['manager'] },
  { name: 'shareddocs.download',    roles: exceptGuest },
  { name: 'attachments.upload',     roles: exceptGuest },
  { name: 'attachments.download',   roles: exceptGuest },
  { name: 'attachments.remove',     roles: ['admin', 'moderator'], allowAuthor: true  },
  { name: 'do.techsupport',         roles: ['admin'] },

  { name: 'ticket.statusChange',                      roles: ['manager', 'maintainer'] },
  { name: 'ticket.statusChangeTo.reported.enter',     roles: exceptGuest },
  { name: 'ticket.statusChangeTo.reported.leave',     roles: exceptGuest },
  { name: 'ticket.statusChangeTo.confirmed.enter',    roles: ['manager', 'maintainer'] },
  { name: 'ticket.statusChangeTo.confirmed.leave',    roles: ['manager', 'maintainer'] },
  { name: 'ticket.statusChangeTo.toApprove.enter',    roles: ['manager', 'maintainer'] },
  { name: 'ticket.statusChangeTo.toApprove.leave',    roles: ['manager', 'maintainer'] },
  { name: 'ticket.statusChangeTo.toVote.enter',       roles: ['manager', 'maintainer'] },
  { name: 'ticket.statusChangeTo.toVote.leave',       roles: ['manager', 'maintainer'] },
  { name: 'ticket.statusChangeTo.scheduled.enter',    roles: ['manager', 'maintainer'] },
  { name: 'ticket.statusChangeTo.scheduled.leave',    roles: ['manager', 'maintainer'] },
  { name: 'ticket.statusChangeTo.progressing.enter',  roles: ['manager', 'maintainer'] },
  { name: 'ticket.statusChangeTo.progressing.leave',  roles: ['manager', 'maintainer'] },
  { name: 'ticket.statusChangeTo.suspended.enter',    roles: ['manager', 'maintainer'] },
  { name: 'ticket.statusChangeTo.suspended.leave',    roles: ['manager', 'maintainer'] },
  { name: 'ticket.statusChangeTo.finished.enter',     roles: ['manager', 'maintainer'] },
  { name: 'ticket.statusChangeTo.finished.leave',     roles: ['manager', 'maintainer'] },
  { name: 'ticket.statusChangeTo.closed.enter',       roles: ['manager', 'maintainer'], allowAuthor: true },
  { name: 'ticket.statusChangeTo.closed.leave',       roles: nobody },
  { name: 'ticket.statusChangeTo.deleted.enter',      roles: ['manager', 'maintainer'] },
  { name: 'ticket.statusChangeTo.deleted.leave',      roles: nobody },  
  { name: 'vote.statusChange',                        roles: ['manager'], allowAuthor: true },
  { name: 'vote.statusChangeTo.announced.enter',      roles: exceptGuest },
  { name: 'vote.statusChangeTo.opened.enter',         roles: ['manager'], allowAuthor: true },
  { name: 'vote.statusChangeTo.opened.leave',         roles: ['manager'] }, 
  { name: 'vote.statusChangeTo.votingFinished.enter', roles: ['manager'], allowAuthor: true },
  { name: 'vote.statusChangeTo.votingFinished.leave', roles: ['manager'] },
  { name: 'vote.statusChangeTo.closed.enter',         roles: ['manager'], allowAuthor: true },
  { name: 'vote.statusChangeTo.closed.leave',         roles: nobody },
  { name: 'vote.statusChangeTo.deleted.enter',        roles: ['manager'] },
  { name: 'vote.statusChangeTo.deleted.leave',        roles: nobody },
  { name: 'forum.statusChange',                       roles: ['manager'] },
  { name: 'forum.statusChangeTo.opened.enter',        roles: ['manager'] },
  { name: 'forum.statusChangeTo.opened.leave',        roles: ['manager'] },
  { name: 'forum.statusChangeTo.closed.enter',        roles: ['manager'], allowAuthor: true },
  { name: 'forum.statusChangeTo.closed.leave',        roles: nobody },
  { name: 'forum.statusChangeTo.deleted.enter',       roles: ['manager'] },
  { name: 'forum.statusChangeTo.deleted.leave',       roles: nobody },
  { name: 'news.statusChange',                        roles: ['manager'] },
  { name: 'news.statusChangeTo.opened.enter',         roles: ['manager'] },
  { name: 'news.statusChangeTo.opened.leave',         roles: ['manager'] },
  { name: 'news.statusChangeTo.closed.enter',         roles: ['manager'], allowAuthor: true },
  { name: 'news.statusChangeTo.closed.leave',         roles: nobody },
  { name: 'news.statusChangeTo.deleted.enter',        roles: ['manager'] },
  { name: 'news.statusChangeTo.deleted.leave',        roles: nobody },
  { name: 'feedback.statusChange',                    roles: ['manager'] },
  { name: 'feedback.statusChangeTo.opened.enter',     roles: ['manager'] },
  { name: 'feedback.statusChangeTo.opened.leave',     roles: ['manager'] },
  { name: 'feedback.statusChangeTo.closed.enter',     roles: ['manager'], allowAuthor: true },
  { name: 'feedback.statusChangeTo.closed.leave',     roles: nobody },
  { name: 'feedback.statusChangeTo.deleted.enter',    roles: ['manager'] },
  { name: 'feedback.statusChangeTo.deleted.leave',    roles: nobody },
];

// The board member has now exactly the same permissions as the manager
Permissions.forEach((perm) => {
  if (!_.contains(perm.roles, 'admin')) perm.roles.push('admin'); // Admin can do anything
  if (_.contains(perm.roles, 'manager')) {
    if (!_.contains(perm.roles, 'board')) perm.roles.push('board'); // The board member has now exactly the same permissions as the manager
  }
});

/* what if more compacted...
const permissions = [
  // Read permissions ('read.publication.name')
  { name: 'read.communities.details',    roles: exceptGuest },
  { name: 'read.memberships.inCommunity',roles: everyRole },
  { name: 'read.parcels.inCommunity',    roles: everyBody },
  { name: 'read.delegations.inCommunity',roles: ['manager'] },
  { name: 'read.topics        ',         roles: exceptGuest },
  { name: 'read.comments',               roles: exceptGuest },
  { name: 'read.breakdowns',            roles: exceptGuest },
  { name: 'read.transactions',               roles: exceptGuest },
  { name: 'read.shareddocs',             roles: exceptGuest },

  // Write permissions ('write.collection.method')
  { name: 'write.community',        roles: ['admin'] },
  { name: 'write.roleships',        roles: ['admin'] },
  { name: 'write.ownerships',       roles: ['admin', 'manager'] },
  { name: 'write.benefactorships',  roles: ['admin', 'manager'] },
  { name: 'write.parcels',          roles: ['manager'] },
  { name: 'create.forum.topics',    roles: exceptGuest },
  { name: 'write.forum.topics',     roles: ['moderator'] },
  { name: 'write.poll.vote.topics', roles: ['owner', 'manager'] },
  { name: 'write.legal.vote.topics',roles: ['manager'] },
  { name: 'write.agendas',          roles: ['manager'] },
  { name: 'write.delegations',      roles: ['manager'] },   // for others (people can naturally write their own delagations)
  { name: 'write.news.topics',      roles: ['manager'] },
  { name: 'create.tickets',         roles: exceptGuest },
  { name: 'write.tickets',          roles: ['manager', 'maintainer'] },
  { name: 'create.room.topic',      roles: everyRole },
  { name: 'create.feedback.topic',  roles: everyRole },
  { name: 'create.comments',        roles: exceptGuest },
  { name: 'write.comments',         roles: ['moderator'] },
  { name: 'write.breakdowns',      roles: ['accountant'] },
  { name: 'write.transactions',         roles: ['treasurer'] },
  { name: 'write.shareddocs',       roles: ['manager'] },

  { name: 'vote.cast',              roles: ['owner', 'delegate', 'manager'] },
  { name: 'vote.castForOthers',     roles: ['manager'] },
  { name: 'vote.close',             roles: ['manager'] },
];
*/
