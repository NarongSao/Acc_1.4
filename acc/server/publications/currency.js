
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {Currency} from '../../imports/api/collections/currency';
/**
 * Currency
 */
Meteor.publish('acc.currency', function () {
    if (this.userId) {
        this.unblock();
        return Currency.find();
    }
});
