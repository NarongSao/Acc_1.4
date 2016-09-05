
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {CloseChartAccountPerMonth} from '../../imports/api/collections/closeChartAccountPerMonth';
/**
 * Close Chart Account
 */
Meteor.publish('acc.closeChartAccountPerMonth', function () {
    if (this.userId) {
        this.unblock();
        return CloseChartAccountPerMonth.find();
    }
});
