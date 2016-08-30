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
import {MapFixAsset} from '../../imports/api/collections/mapFixAsset';


// Page
Meteor.isClient && require('../../imports/ui/pages/mapFixAsset/mapFixAsset.html');

tabularOpts.name = 'acc.mapFixAsset';
tabularOpts.collection = MapFixAsset;
tabularOpts.extraFields= ['fixAsset','accuFixAsset','fixAssetExpense'],
    tabularOpts.columns = [
      {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.acc_mapFixAssetAction},
      {
        data: "fixAssetDoc.name",
        title: "FixAsset"
      }, {
        data: "accuFixAssetDoc.name",
        title: "FixAsset Accumulated"
      }, {
        data: "fixAssetExpenseDoc.name",
        title: "FixAsset Expense"
      }

    ];
export const MapFixAssetTabular = new Tabular.Table(tabularOpts);


