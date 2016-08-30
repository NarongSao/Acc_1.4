import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {Template} from 'meteor/templating';
import {Tabular} from 'meteor/aldeed:tabular';
import {EJSON} from 'meteor/ejson';
import {moment} from 'meteor/momentjs:moment';
import {_} from 'meteor/erasaur:meteor-lodash';
import {numeral} from 'meteor/numeral:numeral';
import {lightbox} from 'meteor/theara:lightbox-helpers';

// Lib
import {tabularOpts} from '../../../core/common/libs/tabular-opts.js';

// Collection
import {ConfigDep} from '../../imports/api/collections/configDep';

// Page
Meteor.isClient && require('../../imports/ui/pages/configDep/configDep.html');

tabularOpts.name = 'acc.configDep';
tabularOpts.collection = ConfigDep;
tabularOpts.columns = [
  {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.acc_configDepAction},
  {data: "_id", title: "ID"},
  {
    data: "depPerTime",
    title: "Depreciation Per Time",
    render: function (val, type, doc) {
      return val+ " month";
    }
  },
  {data: "depType", title: "Depreciation Type"}
];
export const ConfigDepTabular = new Tabular.Table(tabularOpts);

