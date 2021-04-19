import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { _ } from 'meteor/underscore';
import { ModalStack } from '/imports/ui_3/lib/modal-stack.js';

import './meters-widget.html';

Template.Meters_widget.viewmodel({
  autorun() {
    const communityId = ModalStack.getVar('communityId');
    this.templateInstance.subscribe('parcels.ofSelf', { communityId });
  },
  ownedParcels() {
    const user = Meteor.user();
    const communityId = ModalStack.getVar('communityId');
    if (!user || !communityId) return [];
    return user.ownedParcels(communityId);
  },
  oldestReadMeter() {
    const meter = _.sortBy(this.ownedParcels().map(p => p.oldestReadMeter()), m => m.lastReadingDate().getTime())[0];
    return meter;
  },
  lastReadingDate() {
    const meter = this.oldestReadMeter();
    return meter && meter.lastReading().date;
  },
  colorClass() {
    const meter = this.oldestReadMeter();
    const color = meter && meter.lastReadingColor();
    return color ? 'bg-' + color : 'navy-bg';
  },
  icon() {
    return 'fa fa-tachometer';
  },
  message() {
    return 'Message';
  },
});

