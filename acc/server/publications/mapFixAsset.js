import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {MapFixAsset} from '../../imports/api/collections/mapFixAsset';

/**
 * Chart Account
 */
Meteor.publish('acc.mapFixAsset', function() {
  if (this.userId) {
    this.unblock();
    return MapFixAsset.find();
  }
});
