import {Template} from 'meteor/templating';
import {AutoForm} from 'meteor/aldeed:autoform';
import {Roles} from  'meteor/alanning:roles';
import {alertify} from 'meteor/ovcharik:alertifyjs';
import {sAlert} from 'meteor/juliancwirko:s-alert';
import {fa} from 'meteor/theara:fa-helpers';
import {lightbox} from 'meteor/theara:lightbox-helpers';
import {TAPi18n} from 'meteor/tap:i18n';
import {ReactiveTable} from 'meteor/aslagle:reactive-table';
import {moment} from 'meteor/momentjs:moment';

// Lib
import {createNewAlertify} from '../../../../../core/client/libs/create-new-alertify.js';
import {reactiveTableSettings} from '../../../../../core/client/libs/reactive-table-settings.js';
import {renderTemplate} from '../../../../../core/client/libs/render-template.js';
import {destroyAction} from '../../../../../core/client/libs/destroy-action.js';
import {displaySuccess, displayError} from '../../../../../core/client/libs/display-alert.js';
import {__} from '../../../../../core/common/libs/tapi18n-callback-helper.js';

// Component
import '../../../../../core/client/components/loading.js';
import '../../../../../core/client/components/column-action.js';
import '../../../../../core/client/components/form-footer.js';


// Collection
import {MapNBCIncome} from '../../../api/collections/mapNBCIncome';
// Tabular
import {MapNBCIncomeTabular} from '../../../../common/tabulars/mapNBCIncome';
//Method
import {SpaceChar} from '../../../../common/configs/space';
// Page
import './mapNBCIncome.html';
import './chartAccountDetail.html';
import './chartAccountDetail.js';

// Declare template
var indexTpl = Template.acc_mapNBCIncome,
  updateTpl = Template.acc_mapNBCIncomeUpdate;


var chartAccountDetailCollection = new Mongo.Collection(null);
/**
 * Index
 */

indexTpl.onRendered(function() {
  /* Create new alertify */
  createNewAlertify("mapIncomeNBC");
});

indexTpl.events({
  'click .update': function(e, t) {
    var self=this;
    Session.set('nbcAccountName',self.accountDocNBC.code + " | "+ self.accountDocNBC.name )
    alertify.mapIncomeNBC(fa("pencil", "Map NBC Income"),renderTemplate(updateTpl, self));
  }
});
indexTpl.helpers({
  tabularTable(){
    return MapNBCIncomeTabular;
  }
})

updateTpl.helpers({
  collection(){
    return MapNBCIncome;
  },
  nbcAccountName(){
    return Session.get('nbcAccountName');
  },
  chartAccountDetailCollection(){
    return chartAccountDetailCollection;
  }
})


/**
 * Hook
 */
AutoForm.hooks({
  acc_mapNBCIncomeUpdate: {
    before: {
      update: function(doc) {

        doc.$set.branchId = Session.get("currentBranch");
        let transactionData = chartAccountDetailCollection.find().fetch();

        var transaction= [];
        transactionData.forEach(function (obj) {
          transaction.push({account: obj.chartAccount})
        });
        doc.$set.transaction = transaction;
        doc.$unset={};
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      alertify.mapIncomeNBC().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  }
});
