
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {ChartAccount} from '../../imports/api/collections/chartAccount';
/**
 * Chart Account
 */
Meteor.publish('acc.chartAccount', function () {
    if (this.userId) {
        this.unblock();
        return ChartAccount.find();
    }
});

// Reactive Table
ReactiveTable.publish("acc.reactiveTable.chartAccount", ChartAccount);