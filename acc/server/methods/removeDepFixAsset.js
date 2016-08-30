import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {FixAssetDep} from '../../imports/api/collections/fixAssetDep';
import {DepExpList} from '../../imports/api/collections/depExpList';

Meteor.methods({
    removeDepFixAsset: function (id) {

        FixAssetDep.remove({journalId: id});
        DepExpList.remove({journalId: id});
    }
})