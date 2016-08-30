
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {MapNBCBalanceKH} from '../../imports/api/collections/mapNBCBalanceKH';
/**
 * Chart Account
 */
Meteor.publish('acc.mapNBCBalanceKH', function () {
    if (this.userId) {
        this.unblock();
        return MapNBCBalanceKH.find();
    }
});
