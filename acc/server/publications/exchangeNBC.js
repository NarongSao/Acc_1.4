
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {ExchangeNBC} from '../../imports/api/collections/exchangeNBC';
/**
 * Currency
 */
Meteor.publish('acc.exchangeNBC', function () {
    if (this.userId) {
        this.unblock();
        return ExchangeNBC.find();
    }
});
