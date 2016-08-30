import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Journal} from '../../imports/api/collections/journal';

Meteor.methods({
    getVoucherId: function(currencyId,startDate){
        return Journal.findOne({currencyId: currencyId, journalDate: {$gte: startDate}},{sort: {journalDate: -1,voucherId: -1}});
    }
})