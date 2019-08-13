import { Meteor } from 'meteor/meteor';
import { TAPi18n } from 'meteor/tap:i18n';
import { moment } from 'meteor/momentjs:moment';
import { Fraction } from 'fractional';
import { _ } from 'meteor/underscore';
import { Factory } from 'meteor/dburles:factory';
import { debugAssert } from '/imports/utils/assert.js';

import { Accounts } from 'meteor/accounts-base';
import { Communities } from '/imports/api/communities/communities.js';
import { update as updateCommunity } from '/imports/api/communities/methods.js';
import { Parcels } from '/imports/api/parcels/parcels.js';
import { Memberships } from '/imports/api/memberships/memberships.js';
import { defaultRoles } from '/imports/api/permissions/roles.js';
import { Agendas } from '/imports/api/agendas/agendas.js';
import { Topics } from '/imports/api/topics/topics.js';
import { castVote, closeVote } from '/imports/api/topics/votings/methods.js';
import { Comments } from '/imports/api/comments/comments.js';
import { Breakdowns } from '/imports/api/transactions/breakdowns/breakdowns.js';
import { TxDefs } from '/imports/api/transactions/txdefs/txdefs.js';
import { Localizer } from '/imports/api/transactions/breakdowns/localizer.js';
import { Transactions } from '/imports/api/transactions/transactions.js';
import { ParcelBillings } from '/imports/api/transactions/batches/parcel-billings.js';
import { insert as insertParcelBilling } from '/imports/api/transactions/batches/methods.js';
import { CommunityBuilder } from './community-builder.js';

import '/imports/api/topics/votings/votings.js';
import '/imports/api/topics/tickets/tickets.js';
import '/imports/api/topics/rooms/rooms.js';
import '/imports/api/transactions/txdefs/methods.js';


export function insertUnittestFixture(lang) {
  const __ = function translate(text) { return TAPi18n.__(text, {}, lang); };

  // ===== Communities =====

  let demoCommunity = Communities.findOne({ name: 'Unittest house' });
  debugAssert(!demoCommunity, 'Db was not cleaned before unit test');
  demoCommunity = Factory.create('community', {
    name: 'Unittest house',
    totalunits: 100,
  });
  const demoCommunityId = demoCommunity._id;

  const otherCommunityId = Factory.create('community', {
    name: 'Another community',
  })._id;

  const demoBuilder = new CommunityBuilder(demoCommunityId, 'test', lang);
  const otherBuilder = new CommunityBuilder(otherCommunityId, 'test', lang);

  const com = { en: 'com', hu: 'hu' }[lang];
  const demoManagerId = demoBuilder.createLoginableUser('manager');
  const demoAdminId = demoBuilder.createLoginableUser('admin');
  const demoAccountantId = demoBuilder.createLoginableUser('accountant');

// ===== Parcels =====

  const dummyParcels = [];
  dummyParcels[0] = demoBuilder.createParcel({
    units: 0,
    floor: 'P',
    door: '02',
    type: 'parking',
    area: 6,
  });
  dummyParcels[1] = demoBuilder.createParcel({
    units: 10,
    floor: '1',
    door: '12',
    type: 'flat',
    area: 65,
  });
  dummyParcels[2] = demoBuilder.createParcel({
    units: 20,
    floor: '2',
    door: '23',
    type: 'flat',
    area: 142,
  });
  dummyParcels[3] = demoBuilder.createParcel({
    units: 30,
    floor: '3',
    door: '34',
    type: 'flat',
    area: 98.4,
  });
  dummyParcels[4] = demoBuilder.createParcel({
    units: 40,
    floor: '4',
    door: '45',
    type: 'flat',
    area: 70,
  });

  // ===== Demo owners =====

  const demoUserId = demoBuilder.createLoginableUser('owner', undefined, { parcelId: dummyParcels[0], ownership: { share: new Fraction(1, 10) } });
  const demoBenefactorId = demoBuilder.createLoginableUser('benefactor', undefined, { parcelId: dummyParcels[0], benefactorship: { type: 'rental' } });

  // ===== Dummy Users =====

  const dummyUsers = [];
  for (let userNo = 0; userNo <= 5; userNo++) {
    dummyUsers[userNo] = demoBuilder.createDummyUser();
  }

  // ===== Memberships =====

  demoBuilder.createMembership(dummyUsers[0], 'maintainer');
  demoBuilder.createMembership(dummyUsers[1], 'treasurer');
  demoBuilder.createMembership(dummyUsers[1], 'owner', {
    parcelId: dummyParcels[1],
    ownership: {
      share: new Fraction(1, 1),
    },
  });
  // This person is benefactor of parcel[1], but he is not a registered user of the app
  const nonUserPerson = {
    idCard: {
      type: 'natural',
      name: __('demo.user.1.benefactor.name'),
      address: __('demo.user.1.benefactor.address'),
      identifier: '987201NA',
      dob: new Date(1951, 1, 5),
      mothersName: __('demo.user.1.benefactor.mothersName'),
    },
  };
  demoBuilder.createMembership(nonUserPerson, 'benefactor', {
    parcelId: dummyParcels[1],
    benefactorship: {
      type: 'rental',
    },
  });
  // This parcel is owned by a legal entity, and the representor for them is user[2]
  const legalPerson = {
    idCard: {
      type: 'legal',
      name: __('demo.user.3.company.name'),
      address: __('demo.user.3.company.address'),
      identifier: 'Cg.123456-89',
    },
  };
  demoBuilder.createMembership(legalPerson, 'owner', {
    parcelId: dummyParcels[2],
    ownership: {
      share: new Fraction(1, 1),
    },
  });
  // --- ---
  demoBuilder.createMembership(dummyUsers[2], 'owner', {
    parcelId: dummyParcels[2],
    ownership: {
      share: new Fraction(0),
      representor: true,
    },
  });
  demoBuilder.createMembership(dummyUsers[3], 'owner', {
    parcelId: dummyParcels[3],
    ownership: {
      share: new Fraction(1, 1),
    },
  });
  demoBuilder.createMembership(dummyUsers[3], 'owner', {
    parcelId: dummyParcels[4],
    ownership: {
      share: new Fraction(1, 2),
      representor: false,
    },
  });
  demoBuilder.createMembership(dummyUsers[4], 'owner', {
    parcelId: dummyParcels[4],
    ownership: {
      share: new Fraction(1, 4),
      representor: true,
    },
  });
  demoBuilder.createMembership(dummyUsers[5], 'owner', {
    parcelId: dummyParcels[4],
    ownership: {
      share: new Fraction(1, 4),
      representor: false,
    },
  });

  // Give them some parcels in the other community, so to make tests more realistic with more than 1 community
  otherBuilder.createMembership(dummyUsers[1], 'owner');
  otherBuilder.createMembership(dummyUsers[2], 'benefactor');
  otherBuilder.createMembership(dummyUsers[3], 'admin');
  otherBuilder.createMembership(dummyUsers[4], 'accountant');
  otherBuilder.createMembership(dummyUsers[5], 'manager');

  // ===== Forum =====

  ['0', '1', '2'].forEach((topicNo) => {
    const topicId = demoBuilder.create('forum', {});
    ['0', '1', '2'].forEach((commentNo) => {
      demoBuilder.create('comment', { topicId });
    });
  });

  // ===== News =====

  ['0', '1', '2'].forEach((topicNo) => {
    const topicId = demoBuilder.create('news', {
      sticky: topicNo == 2,
    });
  });

  // ===== Votes =====

  const agendaId = demoBuilder.create('agenda');
  const voterships = demoCommunity.voterships();

  const voteTopic0 = demoBuilder.create('vote', {
    agendaId,
    closesAt: moment().subtract(10, 'day').toDate(),  // its past close date
    vote: {
      procedure: 'online',
      effect: 'legal',
      type: 'yesno',
    },
  });

  castVote._execute({ userId: voterships[0].personId }, { topicId: voteTopic0, castedVote: [2] });  // no
  castVote._execute({ userId: voterships[1].personId }, { topicId: voteTopic0, castedVote: [1] });  // yes
  castVote._execute({ userId: voterships[2].personId }, { topicId: voteTopic0, castedVote: [2] });  // no
  castVote._execute({ userId: voterships[3].personId }, { topicId: voteTopic0, castedVote: [0] });  // abstain

  demoBuilder.execute(Topics.methods.statusChange, { topicId: voteTopic0, status: 'votingFinished' });
  demoBuilder.execute(Topics.methods.statusChange, { topicId: voteTopic0, status: 'closed' });

  const voteTopic1 = demoBuilder.create('vote', {
    agendaId,
    closesAt: moment().add(2, 'week').toDate(),
    vote: {
      procedure: 'online',
      effect: 'legal',
      type: 'yesno',
    },
  });

  // No one voted on this yet

  const voteTopic2 = demoBuilder.create('vote', {
    // not part of any agenda
  });

  castVote._execute({ userId: voterships[1].personId }, { topicId: voteTopic2, castedVote: [1, 2, 3, 4] });
  castVote._execute({ userId: voterships[2].personId }, { topicId: voteTopic2, castedVote: [2, 3, 4, 1] });
  castVote._execute({ userId: voterships[3].personId }, { topicId: voteTopic2, castedVote: [3, 4, 1, 2] });

  ['0', '1'].forEach(commentNo =>
    demoBuilder.create('comment', {
      topicId: voteTopic2,
    })
  );

  // ===== Tickets =====

  ['0', '1', '2'].forEach((topicNo) => {
    const topicId = demoBuilder.create('ticket', {});
  });

  // ===== Rooms =====

  const chatPartnerId = dummyUsers[2];
  const demoMessageRoom = demoBuilder.create('room', {
    creatorId: demoUserId,
    participantIds: [demoUserId, chatPartnerId],
  });
  demoBuilder.create('comment', {
    creatorId: chatPartnerId,
    topicId: demoMessageRoom,
  });
  demoBuilder.create('comment', {
    creatorId: demoUserId,
    topicId: demoMessageRoom,
  });

  // ===== Breakdowns =====

  demoBuilder.execute(Transactions.methods.cloneAccountingTemplates, { communityId: demoCommunityId }, demoAccountantId);

  // ===== Transactions =====

  //
//  otherBuilder.insertLoadsOfFakeMembers(10);

  // ===== Returning a bunch of pointers, for easy direct access

  return {
    demoCommunityId,
    demoUserId,
    demoAdminId,
    demoManagerId,
    demoAccountantId,
    dummyUsers,
    dummyParcels,
    builder: demoBuilder,
  };
}
