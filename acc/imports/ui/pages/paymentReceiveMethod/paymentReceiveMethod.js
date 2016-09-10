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
import {PaymentReceiveMethod} from '../../../api/collections/paymentReceiveMethod';


// Tabular
import {PaymentReceiveMethodTabular} from '../../../../common/tabulars/paymentReceiveMethod';

// Page
import './paymentReceiveMethod.html';

// Declare template
var indexTpl = Template.acc_paymentReceiveMethod,
  insertTpl = Template.acc_paymentReceiveMethodInsert,
  updateTpl = Template.acc_paymentReceiveMethodUpdate;

/**
 * Index
 */


indexTpl.onRendered(function() {
  /* Create new alertify */
  createNewAlertify("paymentReceiveMethod");
});

indexTpl.helpers({
  tabularTable(){
    return PaymentReceiveMethodTabular;
  }
})

insertTpl.helpers({
  collection(){
    return PaymentReceiveMethod;
  }
})

updateTpl.helpers({
  collection(){
    return PaymentReceiveMethod;
  }
})


indexTpl.events({

  'click .insert': function(e, t) {
    alertify.paymentReceiveMethod(fa("plus", "Payment/Receive Method"),renderTemplate(insertTpl));
  },
  'click .update': function(e, t) {
    let data=this;
    alertify.paymentReceiveMethod(fa("pencil", "Payment/Receive Method"),renderTemplate(updateTpl, data));
  }
});


updateTpl.events({
  'submit .preventDef': function(evt) {
    evt.preventDefault();
  }
});




/**
 * Hook
 */
AutoForm.hooks({
  acc_paymentReceiveMethodInsert: {
    onSuccess: function(formType, result) {
      alertify.paymentReceiveMethod().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  acc_paymentReceiveMethodUpdate: {
    onSuccess: function(formType, result) {
      alertify.paymentReceiveMethod().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  }
});
