
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {MapClosing} from '../../imports/api/collections/mapCLosing';
/**
 * Chart Account
 */
Meteor.publish('acc.mapClosing', function() {
  if (this.userId) {
    this.unblock();
    return MapClosing.find();
  }
});
