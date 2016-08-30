import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {DateEndOfProcess} from '../../imports/api/collections/dateEndOfProcess';
/**
 * Date End Of Process
 */
Meteor.publish('acc.dateEndOfProcess', function () {
    if (this.userId) {
        this.unblock();
        return DateEndOfProcess.find();
    }
});

