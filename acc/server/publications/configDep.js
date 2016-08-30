
import {Meteor} from 'meteor/meteor';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';

// Collection
import {ConfigDep} from '../../imports/api/collections/configDep';
/**
 * Date End Of Process
 */
Meteor.publish('acc.configDep', function () {
    if (this.userId) {
        this.unblock();
        return ConfigDep.find();
    }
});

