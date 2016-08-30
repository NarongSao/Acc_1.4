import {Meteor} from 'meteor/meteor';
import {Templet} from 'meteor/templating';
import {Tabular} from 'meteor/aldeed:tabular';
import {EJSON} from 'meteor/ejson';
import {moment} from 'meteor/momentjs:moment';
import {_} from 'meteor/erasaur:meteor-lodash';
import {numeral} from 'meteor/numeral:numeral';
import {lightbox} from 'meteor/theara:lightbox-helpers';

// Lib
import {tabularOpts} from '../../../core/common/libs/tabular-opts.js';

// Collection
import {FixAssetExpense} from '../../imports/api/collections/fixAssetExpense';


// Page
Meteor.isClient && require('../../imports/ui/pages/fixAssetExpense/fixAssetExpense.html');

tabularOpts.name = 'acc.fixAssetExpense';
tabularOpts.extraFields = ['journalId', '_id'];
tabularOpts.collection = FixAssetExpense;
tabularOpts.columns = [
    {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.acc_fixAssetExpenseAction},
    {
        data: "date", title: "Date",
        render: function (val, type, doc) {
            return moment(val).format("DD/MM/YYYY")
        }
    },
    {
        data: "transactionExpense", title: "Depreciation Expense",
        render: function (val, type, doc) {
            var exp = "";
            if (val != undefined) {
                val.forEach(function (obj) {
                    exp += moment(obj.buyDate).format("DD/MM/YYYY") + "    :     " + obj.account + "  :  <b>" + obj.value + obj.currencyId + "</b><br>"
                })
            }
            return exp;
        }
    },

    {
        data: "createdBy", title: "User Create",
        render: function (val, type, doc) {
            return Meteor.users.findOne({_id: val}).username;
        }
    }



];
export const FixAssetExpenseTabular = new Tabular.Table(tabularOpts);




