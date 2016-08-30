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
import {DateEndOfProcess} from '../../imports/api/collections/dateEndOfProcess.js';

// Page
Meteor.isClient && require('../../imports/ui/pages/endOfProcess/endOfProcess.html');

tabularOpts.name = 'acc.dateEndOfProcess';
tabularOpts.collection = DateEndOfProcess;
tabularOpts.columns = [
    {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.acc_dateEndOfProcessAction},
     {
        data: "closeDate", title: "Date",
        render: function (val, type, doc) {
            return moment(val).format("DD/MM/YYYY");
        }
    },
    {
        data: "createdBy", title: "User Create",
        render: function (val, type, doc) {
            let userName= Meteor.users.findOne({_id: val});
            if(userName){
                return userName.username;
            }
        }
    }
];
export const DateEndOfProcessTabular = new Tabular.Table(tabularOpts);



