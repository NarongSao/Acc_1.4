import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {AccountType} from '../../imports/api/collections/accountType';

/**
 * Account Type
 */
Meteor.publish('acc.accountType', function () {
    if (this.userId) {
        this.unblock();
        return AccountType.find();
    }
});
