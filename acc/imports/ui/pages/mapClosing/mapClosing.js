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
import {MapClosing} from '../../../api/collections/mapCLosing';


// Tabular
import {MapCLosingTabular} from '../../../../common/tabulars/mapClosing';

// Page
import './mapCLosing.html';

// Declare template
var indexTpl = Template.acc_mapClosing,
  updateTpl = Template.acc_mapClosingUpdate;

/**
 * Index
 */


indexTpl.onRendered(function() {
  /* Create new alertify */
  createNewAlertify("mapClosing");
});

indexTpl.helpers({
  tabularTable(){
    return MapCLosingTabular;
  }
})

updateTpl.helpers({
  collection(){
    return MapClosing;
  }
})


indexTpl.events({

  'click .update': function(e, t) {
    let data=this;
    alertify.mapClosing(fa("pencil", "Mapping Account"),renderTemplate(updateTpl, data));
  },
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
  acc_mapClosingUpdate: {
    onSuccess: function(formType, result) {
      alertify.mapClosing().close();
      alertify.success('Success');
    },
    onError: function(formType, error) {
      alertify.error(error.message);
    }
  }
});
