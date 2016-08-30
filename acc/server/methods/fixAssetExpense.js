import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {ConfigDep} from '../../imports/api/collections/configDep';
import {DepExpList} from '../../imports/api/collections/depExpList';
import {Journal} from '../../imports/api/collections/journal';
import {FixAssetExpense} from '../../imports/api/collections/fixAssetExpense';

Meteor.methods({
    removeFixAssetExpense: function (id) {
        var depType=ConfigDep.findOne();
        DepExpList.update({isDep: true}, {$inc: {increment: -1}},{multi: true});
        var depList = DepExpList.find({increment: 0}).fetch();

        if (depList.length != 0) {
            depList.forEach(function (obj) {
                //Update DepExpList
                var transactionUpdate = [];
                var i = 1;

                obj.transactionAsset.sort(compare);
                obj.transactionAsset.forEach(function (ob) {
                    if (i == 1 && ob.month > 0) {
                        ob.month -= depType.depPerTime;
                        ob.month= ob.month>0 ? ob.month: 0;
                        i++;

                        if (ob.month < ob.maxMonth) {
                            obj.isDep = false;
                        }
                    }
                    if (ob.month < ob.maxMonth) {
                        ob.status = false;
                    }
                    transactionUpdate.push(ob);
                })
                transactionUpdate.sort(compareASD);
                obj.transactionAsset = transactionUpdate;
                DepExpList.update({_id: obj._id}, {$set: obj});
            })
        }

        Journal.remove({fixAssetExpenseId: id});
        FixAssetExpense.remove(id);
    }
})

function compare(a, b) {
    if (a.year < b.year) {
        return 1;
    } else if (a.year > b.year) {
        return -1;
    } else {
        return 0;
    }
}
function compareASD(a, b) {
    if (a.year < b.year) {
        return -1;
    } else if (a.year > b.year) {
        return 1;
    } else {
        return 0;
    }
}


