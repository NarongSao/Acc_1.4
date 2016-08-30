
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {MapNBCIncomeKH} from '../../imports/api/collections/mapNBCIncomeKH';
/**
 * Chart Account
 */
Meteor.publish('acc.mapNBCIncomeKH', function () {
    if (this.userId) {
        this.unblock();
        return MapNBCIncomeKH.find();
    }
});
