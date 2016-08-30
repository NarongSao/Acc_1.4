
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {Closing} from '../../imports/api/collections/closing';
/**
 * Date End Of Process
 */
Meteor.publish('acc.closing', function () {
    if (this.userId) {
        this.unblock();
        return Closing.find();
    }
});

