import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Journal} from '../../imports/api/collections/journal';

Meteor.methods({
   getJournal: function(selector){
       return Journal.findOne(selector);
   },
    getJournalForLedger: function(voucherId,id){
        var data = Journal.findOne({voucherId: voucherId,_id: id});
         return data;
    }

});


