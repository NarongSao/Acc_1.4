
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {MapNBCIncome} from '../../imports/api/collections/mapNBCIncome';
/**
 * Chart Account
 */
Meteor.publish('acc.mapNBCIncome', function () {
    if (this.userId) {
        this.unblock();
        return MapNBCIncome.find();
    }
});
