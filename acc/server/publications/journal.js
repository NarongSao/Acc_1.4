
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {Journal} from '../../imports/api/collections/journal';
/**
 * Journal
 */
Meteor.publish('acc.journal', function () {
    if (this.userId) {
        this.unblock();
        return Journal.find();
    }
});
/*
Meteor.publish('acc_JournalById', function (selector = {}, options = {}) {
    if (this.userId) {
        this.unblock();
        check(selector, Object);
        check(options, Object);
        return Acc.Collection.Journal.findOne(selector, options);
    }
});
*/
