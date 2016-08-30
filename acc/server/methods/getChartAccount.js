import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {ChartAccount} from '../../imports/api/collections/chartAccount';

Meteor.methods({
   getChartAccount: function(selector){
       return ChartAccount.findOne(selector);
   }
});