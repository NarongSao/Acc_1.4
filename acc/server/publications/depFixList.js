import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {DepExpList} from '../../imports/api/collections/depExpList';
/**
 * Date End Of Process
 */
Meteor.publish('acc.depFixList', function () {
    if (this.userId) {
        this.unblock();
        return DepExpList.find();
    }
});

