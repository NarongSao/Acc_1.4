
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {ChartAccountNBC} from '../../imports/api/collections/chartAccountNBC';
/**
 * Chart Account
 */
Meteor.publish('acc.chartAccountNBC', function () {
    if (this.userId) {
        this.unblock();
        return ChartAccountNBC.find();
    }
});
