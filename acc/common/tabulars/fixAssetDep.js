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
import {FixAssetDep} from '../../imports/api/collections/fixAssetDep';


// Page
Meteor.isClient && require('../../imports/ui/pages/fixAssetDep/fixAssetDep.html');

tabularOpts.name = 'acc.fixAssetDep';
tabularOpts.collection = FixAssetDep;
tabularOpts.extraFields=['journalId', '_id'],
tabularOpts.columns = [
    {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.acc_fixAssetDepAction},
    {
        data: "date", title: "Date",
        render: function (val, type, doc) {
            return moment(val).format("DD/MM/YYYY")
        }
    },
    {
        data: "transactionAsset", title: "Account",
        render: function (val, type, doc) {
            var exp = "";
            val.forEach(function (obj) {
                exp += obj.account + "<br>";
            })
            return exp;
        }
    }, {
        data: "transactionAsset", title: "Description",
        render: function (val, type, doc) {
            var exp = "";
            val.forEach(function (obj) {
                exp += obj.description + "<br>";
            })
            return exp;
        }
    },{
        data: "transactionAsset", title: "Code",
        render: function (val, type, doc) {
            var exp = "";
            val.forEach(function (obj) {
                exp += obj.code + "<br>";
            })
            return exp;
        }
    },{
        data: "transactionAsset", title: "Value",
        render: function (val, type, doc) {
            var exp = "";
            val.forEach(function (obj) {
                exp += obj.value + "<br>";
            })
            return exp;
        }
    }, {
        data: "transactionAsset", title: "Life",
        render: function (val, type, doc) {
            var exp = "";
            val.forEach(function (obj) {
                exp += obj.life + "<br>";
            })
            return exp;
        }
    }, {
        data: "transactionAsset", title: "Salvage",
        render: function (val, type, doc) {
            var exp = "";
            val.forEach(function (obj) {
                exp += obj.estSalvage + "<br>";
            })
            return exp;
        }
    }, {
        data: "transactionAsset", title: "Percent",
        render: function (val, type, doc) {
            var exp = "";
            val.forEach(function (obj) {
                exp += obj.percent + "<br>";
            })
            return exp;
        }
    },

    {data: "currencyId", title: "Currency"}



];
export const FixAssetDepTabular = new Tabular.Table(tabularOpts);




