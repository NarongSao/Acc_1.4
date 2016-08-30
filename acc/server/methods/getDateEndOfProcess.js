import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {DateEndOfProcess} from '../../imports/api/collections/dateEndOfProcess';

Meteor.methods({
   getDateEndOfProcess: function(selector){
       return DateEndOfProcess.findOne(selector, {sort: {closeDate: -1}});
   }
});