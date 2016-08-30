
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {MapNBCBalance} from '../../imports/api/collections/mapNBCBalance';
/**
 * Chart Account
 */
Meteor.publish('acc.mapNBCBalance', function () {
    if (this.userId) {
        this.unblock();
        return MapNBCBalance.find();
    }
});
