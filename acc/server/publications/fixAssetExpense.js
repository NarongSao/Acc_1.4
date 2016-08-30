import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {FixAssetExpense} from '../../imports/api/collections/fixAssetExpense';

/**
 * Date End Of Process
 */
Meteor.publish('acc.fixAssetExpense', function () {
    if (this.userId) {
        this.unblock();
        return FixAssetExpense.find();
    }
});

