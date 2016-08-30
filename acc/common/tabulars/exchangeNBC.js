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
import {ExchangeNBC} from '../../imports/api/collections/exchangeNBC';


// Page
Meteor.isClient && require('../../imports/ui/pages/exchangeNBC/exchangeNBC.html');

tabularOpts.name = 'acc.exchangeNBC';
tabularOpts.collection = ExchangeNBC;
tabularOpts.columns = [
    {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.acc_exchangeNBCAction},
    {
        data: "dateTime", title: "Date",
        render: function (val, type, doc) {
            return moment(val).format("DD/MM/YYYY");
        }
    },
    {data: "base", title: "Base Currency"},
    {
        data: "rates",
        title: "Rates",
        render: function (val, type, doc) {
            return JSON.stringify(val);
        }
    }
];
export const ExchangeNBCTabular = new Tabular.Table(tabularOpts);



