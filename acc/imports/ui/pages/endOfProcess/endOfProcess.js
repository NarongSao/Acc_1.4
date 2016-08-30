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
import {DateTimePicker} from 'meteor/tsega:bootstrap3-datetimepicker';

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
import {DateEndOfProcess} from '../../../api/collections/dateEndOfProcess';
import {CloseChartAccount} from '../../../api/collections/closeChartAccount';

// Tabular
import {DateEndOfProcessTabular} from '../../../../common/tabulars/dateEndOfProcess';

// Page
import './endOfProcess.html';

// Declare template

var dateEndOfProcessTpl = Template.acc_dateEndOfProcess,
    dateEndOfProcessInsertTpl = Template.acc_dateEndOfProcessInsert;


Tracker.autorun(function () {
    if (Session.get('isSave')) {
        swal({
            title: "Pleas Wait",
            text: "Ending Process....",
            showConfirmButton: false
        })

        // swal("End Process!", "Your Process has been ended.", "success");
        if (Session.get('isSuccess')) {
            setTimeout(function () {
                swal.close();
            }, 500)
            Session.set('isSuccess', undefined);
        }
    }
});


dateEndOfProcessTpl.onRendered(function () {
    createNewAlertify("endOfProcess");
})

dateEndOfProcessTpl.helpers({
    selector: function () {
        return {branchId: Session.get("currentBranch")};
    },
    tabularTable(){
        return DateEndOfProcessTabular;
    }
})

dateEndOfProcessInsertTpl.helpers({
    collection(){
        return DateEndOfProcess;
    }
})

dateEndOfProcessInsertTpl.onRendered(function () {
    disableDate();
})

dateEndOfProcessTpl.events({
    'click .endOfProcess': function (e, t) {
        Session.set('isSave', undefined);
        Session.set('isSuccess', undefined);

        alertify.endOfProcess(fa("plus", "End Of Process"), renderTemplate(
            dateEndOfProcessInsertTpl));
    },


    'click .remove': function (e, t) {
        var id = this._id;
        var lastEnd = DateEndOfProcess.findOne({}, {
            sort: {
                closeDate: -1
            }
        });
        if (lastEnd.closeDate.getTime() === this.closeDate.getTime()) {
            alertify.confirm("Are you sure to delete ?")
                .set({
                    onok: function (closeEvent) {
                        Meteor.call('removeEndOfProcess', id, function (err, result) {
                            if (!err) {
                                alertify.success('Success');
                            }
                        });
                    },
                    title: fa("remove", "End of Process")
                });
        } else {
            alertify.error("You can't delete. This is not the last End Of Process!!!");
        }
    }
})
;

dateEndOfProcessInsertTpl.events({
    'click .save': function (e, t) {
        Session.set('isSave', true);
    }
})


var disableDate = function () {
    var selectorGetLastDate = {};
    var branchId = Session.get("currentBranch");
    selectorGetLastDate.branchId = branchId;

    var dateVal = DateEndOfProcess.findOne(selectorGetLastDate, {
        sort: {
            closeDate: -1
        }
    });
    if (dateVal != undefined) {
        let mindate = moment(moment(dateVal.closeDate).format("DD/MM/YYYY"),"DD/MM/YYYY").add(1, "days").toDate();
        $("[name='closeDate']").data('DateTimePicker').minDate(mindate);

    }
}

/**
 * Hook
 */
AutoForm.hooks({
    acc_dateEndOfProcessInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get("currentBranch");
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            Session.set('isSuccess',true)
            alertify.endOfProcess().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
