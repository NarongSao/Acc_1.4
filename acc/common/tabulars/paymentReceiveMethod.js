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
import {PaymentReceiveMethod} from '../../imports/api/collections/paymentReceiveMethod';


// Page
Meteor.isClient && require('../../imports/ui/pages/paymentReceiveMethod/paymentReceiveMethod.html');

tabularOpts.name = 'acc.paymentReceiveMethod';
tabularOpts.collection = PaymentReceiveMethod;
tabularOpts.extraFields = ['chartAccount'];
tabularOpts.columns = [
    {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.acc_paymentReceiveMethodAction},
    {
        data: "chartAccountCompare",
        title: "Compare Account"
    }, {
        data: "accountDoc",
        title: "Chart Account",
        render: function (val, type, doc) {
            if(val!=undefined)
            return result = val.code + " | " + val.name;
        }
    }

];
export const PaymentReceiveMethodTabular = new Tabular.Table(tabularOpts);

