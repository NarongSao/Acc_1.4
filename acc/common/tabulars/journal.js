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
import {Journal} from '../../imports/api/collections/journal';
import {Currency} from '../../../core/imports/api/collections/currency';


// Page
Meteor.isClient && require('../../imports/ui/pages/journal/journal.html');

tabularOpts.name = 'acc.journal';
tabularOpts.collection = Journal;
tabularOpts.order= ['2', 'desc'],
tabularOpts.extraFields = ['currencyId', 'transactionAsset', 'transaction', 'endId', 'fixAssetExpenseId', 'closingId','refId'];
tabularOpts.columns = [
    {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.acc_journalAction},
    {data: "_id", title: "Id"},
    {
        data: "journalDate", title: "Journal Date",
        render: function (val, type, doc) {
            return moment(val).format("DD/MM/YYYY");
        }
    },
    {
        data: "voucherId", title: "Voucher",
        render: function (val, type, doc) {
            return val.substr(8, val.length)
        }
    },
    {data: "memo", title: "Description"},
    {
        data: "total", title: "Amount",
        render: function (val, type, doc) {
            if (val != null) {
                var currencySymbol = Currency.findOne({_id: doc.currencyId});
                let symbol="";
                if(currencySymbol){
                    symbol=currencySymbol.symbol;
                }
                return symbol + numeral(val).format("0,0.00");
            }
        }
    },
    {data: "currencyId", title: "Currency"}
];
export const JournalTabular = new Tabular.Table(tabularOpts);



