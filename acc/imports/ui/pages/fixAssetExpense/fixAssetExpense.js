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
import {FixAssetExpense} from '../../../api/collections/fixAssetExpense';


// Tabular
import {FixAssetExpenseTabular} from '../../../../common/tabulars/fixAssetExpense';

// Page
import './fixAssetExpense.html';

// Declare template
var fixAssetExpenseTpl = Template.acc_fixAssetExpense,
    fixAssetExpenseInsertTpl = Template.acc_fixAssetExpenseInsert;
fixAssetExpenseTpl.onRendered(function () {
    createNewAlertify("depreciationExpense");
})

fixAssetExpenseTpl.helpers({
    tabularTable(){
        return FixAssetExpenseTabular;
    },
    selector: function () {
        return {branchId: Session.get("currentBranch")};
    }
})
fixAssetExpenseInsertTpl.onRendered(function () {
    // disableDate();
})

fixAssetExpenseInsertTpl.helpers({
    collection(){
        return FixAssetExpense;
    }
})


fixAssetExpenseTpl.events({
    'click .depreciationExpense': function (e, t) {
        alertify.depreciationExpense(fa("plus", "Depreciation Expense"), renderTemplate(
            fixAssetExpenseInsertTpl));
    },
    'click .remove': function (e, t) {
        var id = this._id;
        alertify.confirm(
            fa("remove", "Fix Asset Expense"),
            "Are you sure to delete [" + id + "]?",
            function () {

                Meteor.call("removeFixAssetExpense",id,function (error) {
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
    acc_fixAssetExpenseInsert: {
        before: {
            insert: function (doc) {
                doc.branchId=Session.get("currentBranch");
                return doc;
            }
        },
        onSuccess: function(formType, result) {
            event.preventDefault();
            alertify.depreciationExpense().close();
            alertify.success("Success");
        },
        onError: function(formType, error) {
            alertify.error(error.message);
        }
    }
});


var disableDate = function () {
    var selectorGetLastDate = {};
    var branchId = Session.get("currentBranch");
    selectorGetLastDate.branchId = branchId;

    var dateVal = FixAssetExpense.findOne(selectorGetLastDate, {
        sort: {
            date: -1
        }
    });
    var mindate = moment(dateVal.date).add(1, "days").toDate();
    $("#date").data('DateTimePicker').minDate(mindate);
}
