import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Modal } from 'meteor/peppelg:bootstrap-3-modal';
import { moment } from 'meteor/momentjs:moment';
import { $ } from 'meteor/jquery';

import { __ } from '/imports/localization/i18n.js';
import { ModalStack } from '/imports/ui_3/lib/modal-stack.js';
import { Balances } from '/imports/api/transactions/balances/balances.js';
import { Period } from '/imports/api/transactions/breakdowns/period.js';
import './ledger-report.html';

Template.Ledger_report.onCreated(function onCreated() {
  this.autorun(() => {
    const communityId = ModalStack.getVar('communityId');
    this.subscribe('balances.ofAccounts', { communityId });
  });
});

Template.Ledger_report.helpers({
  balance(account, tag, sideFunc, tagtype) {
    const balance = Balances.get({
      communityId: ModalStack.getVar('communityId'),
      account: account.code,
      tag,
    }, tagtype);
    return balance[sideFunc]();
  },
  hasActivity(account) {
    return !!Balances.findOne({
      communityId: ModalStack.getVar('communityId'),
      account: new RegExp('^' + account.code),
    });
  },
  headerLevelClass(account) {
    return 'header-level' + (account.code.length - 1).toString();
  },
  displayAccount(account) {
    return account.displayAccount();
  },
});

Template.Ledger_report.events({
  'click .cell,.row-header'(event, instance) {
    const pageInstance = instance.parent(1);
    const communityId = pageInstance.viewmodel.communityId();
    if (!Meteor.user().hasPermission('transactions.inCommunity', { communityId })) return;
    const accountCode = $(event.target).closest('[data-account]').data('account');
    const periodTag = $(event.target).closest('[data-tag]').data('tag');
    const period = Period.fromTag(periodTag);
    Modal.show('Modal', {
      title: __('Account history'),
      body: 'Account_history',
      bodyContext: {
        beginDate: period.begin(),
        endDate: period.end(),
        accountOptions: pageInstance.viewmodel.accountOptions(),
        accountSelected: '' + accountCode,
        localizerOptions: pageInstance.viewmodel.localizerOptions(),
  //        localizerSelected: '',
      },
      size: 'lg',
    });
  },
});
