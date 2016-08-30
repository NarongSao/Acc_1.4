import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {ChartAccountNBCKH} from '../../imports/api/collections/chartAccountNBCKH';

/**
 * Chart Account
 */
Meteor.publish('acc.chartAccountNBCKH', function () {
    if (this.userId) {
        this.unblock();
        return ChartAccountNBCKH.find();
    }
});
