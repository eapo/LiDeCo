import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

// We need to make the client calls noRetry, bacause our methods are not idempotent (should not be called twice),
// This can only be done using Meteor.apply instead of Meteor.call
// Meteor.call(name, [arg1, arg2...], [asyncCallback])
// Meteor.apply(name, args, [options], [asyncCallback])
Meteor.call = function callWoRetry(name, ...args) {
  console.log('callWoRetry', name);
  const options = { noRetry: true };
  let asyncCallback;
  if (typeof _.last(args) === 'function') {
    asyncCallback = args.pop();
  }
  return Meteor.apply(name, args, options, asyncCallback);
};
