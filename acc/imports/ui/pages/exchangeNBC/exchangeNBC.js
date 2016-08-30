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
import {ExchangeNBC} from '../../../api/collections/exchangeNBC';

// Tabular
import {ExchangeNBCTabular} from '../../../../common/tabulars/exchangeNBC.js';

// Page
import './exchangeNBC.html';

// Declare template
var indexTpl = Template.acc_exchangeNBC,
  insertTpl = Template.acc_exchangeNBCInsert,
  updateTpl = Template.acc_exchangeNBCUpdate,
  showTpl = Template.acc_exchangeNBCShow;

// Index
indexTpl.onCreated(function() {
  createNewAlertify("exchangeNBC");
});


insertTpl.events({
  'submit .preventDef': function(evt) {
    evt.preventDefault();
  }
});

updateTpl.events({
  'submit .preventDef': function(evt) {
    evt.preventDefault();
  }
});


indexTpl.events({
  'click .insert': function(e, t) {
    alertify.exchangeNBC(fa("plus", "Exchange"), renderTemplate(insertTpl))
      .maximize();
  },
  'click .update': function(e, t) {
    var data = ExchangeNBC.findOne(this._id);
    alertify.exchangeNBC(fa("pencil", "Exchange"), renderTemplate(
        updateTpl, data))
      .maximize();
  },
  'click .remove': function(e, t) {
    var id = this._id;

    alertify.confirm(
      fa("remove", "Exchange"),
      "Are you sure to delete [" + this.dateTime + "]?",
      function() {
        ExchangeNBC.remove(id, function(error) {
          if (error) {
            alertify.error(error.message);
          } else {
            alertify.success("Success");
          }
        });
      },
      null);
  },
  'click .show': function(e, t) {
    this.ratesVal = JSON.stringify(this.rates);
    alertify.alert(fa("eye", "Exchange"), renderTemplate(showTpl, this).html);
  }
});

indexTpl.helpers({
  tabularTable(){
    return ExchangeNBCTabular;
  },
})

insertTpl.helpers({
  collection(){
    return ExchangeNBC;
  },

  doc: function() {
    var baseCurrency = 'KHR';

    if (baseCurrency == 'KHR') {
      var khr = 1;
    } else if (baseCurrency == 'USD') {
      var usd = 1;
    } else {
      var thb = 1;
    }

    return {
      base: baseCurrency,
      khr: khr,
      usd: usd,
      thb: thb
    };
  }
});

updateTpl.helpers({
  collection(){
    return ExchangeNBC;
  }
})



// Hook
AutoForm.hooks({
  acc_exchangeNBCInsert: {
    onSuccess: function(formType, result) {
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  },
  acc_exchangeNBCUpdate: {
    onSuccess: function(formType, error) {
      alertify.exchangeNBC().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  }
});
