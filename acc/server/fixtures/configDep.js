import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

import {ConfigDep} from '../../imports/api/collections/configDep';
Meteor.startup(function () {
    if (ConfigDep.find().count() == 0) {

        ConfigDep.insert({depPerTime: 1,depType: "01: Straight Line"});

    }
});