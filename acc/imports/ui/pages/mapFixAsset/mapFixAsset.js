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
import {MapFixAsset} from '../../../api/collections/mapFixAsset';


// Tabular
import {MapFixAssetTabular} from '../../../../common/tabulars/mapFixAsset.js';

// Page
import './mapFixAsset.html';

// Declare template
var indexTpl = Template.acc_mapFixAsset,
    insertTpl = Template.acc_mapFixAssetInsert,
    updateTpl = Template.acc_mapFixAssetUpdate;

/**
 * Index
 */

indexTpl.onRendered(function () {
    /* Create new alertify */
    createNewAlertify("mapFixAsset");
});

indexTpl.helpers({
    tabularTable(){
        return MapFixAssetTabular;
    }
})

insertTpl.helpers({
    collection(){
        return MapFixAsset;
    }
})

updateTpl.helpers({
    collection(){
        return MapFixAsset;
    }
})

indexTpl.events({

    'click .insert': function (e, t) {
        alertify.mapFixAsset(fa("plus", "Map Closing"), renderTemplate(insertTpl));
    }, 'click .update': function (e, t) {
        var self = this;
        alertify.mapFixAsset(fa("pencil", "Map Closing"), renderTemplate(updateTpl, self));
    },
    'click .remove': function (e, t) {
        var self = this;
        alertify.confirm(
            fa("remove", "Map FixAsset"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                MapFixAsset.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null
        );
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    acc_mapFixAssetInsert: {
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }, acc_mapFixAssetUpdate: {
        onSuccess: function (formType, result) {
            alertify.mapFixAsset().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
