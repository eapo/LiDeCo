/* eslint-disable no-multi-spaces */
import { exceptGuest, everyRole, everyBody, nobody } from './roles.js';

export const Permissions = [
  { name: 'communities.details',    roles: exceptGuest },
//  { name: 'communities.insert',     roles: everyRole },
  { name: 'communities.update',     roles: ['admin'] },
  { name: 'communities.remove',     roles: ['admin'] },
  { name: 'memberships.inCommunity',roles: everyRole },
  { name: 'roleships.insert',       roles: ['admin', 'manager'] },
  { name: 'roleships.update',       roles: ['admin', 'manager'] },
  { name: 'roleships.remove',       roles: ['admin', 'manager'] },
  { name: 'ownerships.insert',      roles: ['admin', 'manager'] },
  { name: 'ownerships.update',      roles: ['admin', 'manager'] },
  { name: 'ownerships.remove',      roles: ['admin', 'manager'] },
  { name: 'benefactorships.insert', roles: ['admin', 'manager'] },
  { name: 'benefactorships.update', roles: ['admin', 'manager'] },
  { name: 'benefactorships.remove', roles: ['admin', 'manager'] },
  { name: 'parcels.inCommunity',    roles: everyBody },
  { name: 'parcels.insert',         roles: ['admin', 'manager'] },
  { name: 'parcels.update',         roles: ['admin', 'manager'] },
  { name: 'parcels.remove',         roles: ['admin', 'manager'] },
  { name: 'forum.insert',           roles: exceptGuest },
  { name: 'forum.update',           roles: nobody, allowAuthor: true },
  { name: 'forum.remove',           roles: ['moderator'], allowAuthor: true },
//  { name: 'poll.insert',            roles: ['owner'] },
//  { name: 'poll.update',            roles: nobody },
//  { name: 'poll.remove',            roles: nobody, allowAuthor: true },
  { name: 'vote.insert',            roles: ['manager'] },
  { name: 'vote.update',            roles: ['manager'], allowAuthor: true },
  { name: 'vote.remove',            roles: ['manager'], allowAuthor: true },
  { name: 'vote.cast',              roles: ['owner', 'delegate', 'manager'] },
  { name: 'vote.castForOthers',     roles: ['manager'] },
  { name: 'vote.close',             roles: ['manager'] },
  { name: 'agendas.insert',         roles: ['manager'] },
  { name: 'agendas.update',         roles: ['manager'] },
  { name: 'agendas.remove',         roles: ['manager'] },
  { name: 'delegations.inCommunity',roles: ['manager'] },
  { name: 'delegations.forOthers',  roles: ['manager'] },
//  { name: 'delegations.update',     roles: nobody, allowAuthor: true },
//  { name: 'delegations.remove',     roles: nobody, allowAuthor: true },
  { name: 'news.insert',            roles: ['manager'] },
  { name: 'news.update',            roles: ['manager'] },
  { name: 'news.remove',            roles: ['manager'] },
  { name: 'ticket.insert',          roles: exceptGuest },
  { name: 'ticket.update',          roles: ['manager', 'maintainer'], allowAuthor: true },
  { name: 'ticket.remove',          roles: ['manager', 'maintainer'], allowAuthor: true },
  { name: 'room.insert',            roles: everyRole },
  { name: 'room.update',            roles: nobody },
  { name: 'feedback.insert',        roles: everyRole },
  { name: 'feedback.update',        roles: nobody },
  { name: 'topics.listing',         roles: exceptGuest },
  { name: 'comments.insert',        roles: exceptGuest },
  { name: 'comments.update',        roles: nobody, allowAuthor: true },
  { name: 'comments.remove',        roles: ['moderator'], allowAuthor: true },
  { name: 'comments.listing',       roles: exceptGuest },
  { name: 'like.toggle',            roles: exceptGuest },
  { name: 'finances.view',          roles: exceptGuest },
  { name: 'breakdowns.insert',     roles: ['accountant'] },
  { name: 'breakdowns.update',     roles: ['accountant'] },
  { name: 'breakdowns.remove',     roles: ['accountant'] },
  { name: 'breakdowns.listing',    roles: ['accountant', 'treasurer', 'overseer'] },
  { name: 'journals.inCommunity',   roles: exceptGuest },
  { name: 'journals.insert',        roles: ['treasurer'] },
  { name: 'journals.update',        roles: ['treasurer'] },
  { name: 'journals.remove',        roles: ['treasurer'] },
  { name: 'journals.listing',       roles: ['accountant', 'treasurer', 'overseer'] },
  { name: 'shareddocs.upload',      roles: ['manager'] },
  { name: 'shareddocs.download',    roles: exceptGuest },
];

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
  { name: 'read.journals',               roles: exceptGuest },
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
  { name: 'write.journals',         roles: ['treasurer'] },
  { name: 'write.shareddocs',       roles: ['manager'] },

  { name: 'vote.cast',              roles: ['owner', 'delegate', 'manager'] },
  { name: 'vote.castForOthers',     roles: ['manager'] },
  { name: 'vote.close',             roles: ['manager'] },
];
*/
