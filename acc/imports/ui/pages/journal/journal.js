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
import {Switchery} from 'meteor/abpetkov:switchery';
import {ReactiveMethod} from 'meteor/simple:reactive-method';

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
import {Journal} from '../../../api/collections/journal';


// Tabular
import {JournalTabular} from '../../../../common/tabulars/journal';

// Page
import './journal.html';
import './journalDetail.html';
import './journalDetail.js';
import './fixAsset.js';
import './fixAsset.html';
import '../../../../common/methods/getVoucher.js';

import '../../libs/format';
// Declare template
var indexTpl = Template.acc_journal;
var insertTpl = Template.acc_journalInsert;
var updateTpl = Template.acc_journalUpdate;
var showTpl = Template.acc_journalShow;


//Global

var fixAssetDepCollection = new Mongo.Collection(null);
var journalDetailCollection = new Mongo.Collection(null);
stateFixAsset = new ReactiveObj({
    isFixAsset: false
})

state = new ReactiveObj({
    dr: 0,
    cr: 0,
    totalDr: 0,
    totalCr: 0,
    account: "",
    cssClassForAddMore: 'disabled'
});


//Track
Tracker.autorun(function () {
    if (Session.get('currencyId') && Session.get('dobSelect')) {
        var currentCurrency = Session.get('currencyId');
        var dobSelect = Session.get('dobSelect');
        var startYear = new Date(dobSelect).getFullYear();
        var startDate = new Date('01/01/' + startYear);
        Meteor.call('getVoucherId', currentCurrency, startDate, function (err, result) {
            if (result != undefined) {
                Session.set('lastVoucherId', parseInt((result.voucherId).substr(8, 13)) + 1);
            } else {
                Session.set('lastVoucherId', "000001");
            }
        });

    }

    if (Session.get('isTotal')) {
        let totalDr = 0;
        let totalCr = 0;
        let detailList = journalDetailCollection.find().fetch();
        detailList.forEach(function (obj) {
            totalDr += obj.dr;
            totalCr += obj.cr;
        })
        state.set('totalDr', math.round(totalDr, 2));
        state.set('totalCr', math.round(totalCr, 2));

        if (math.round(totalDr, 2) == math.round(totalCr, 2)) {
            state.set('cssClassForSubmit', '');
        } else {
            state.set('cssClassForSubmit', 'disabled');
        }
    }
});

//Create
indexTpl.onCreated(function () {
    createNewAlertify(['journal']);
    stateFixAsset.set('isFixAsset', false);
});

//Render

insertTpl.onRendered(function () {
    disableDate();
    switcherFun();

    Meteor.setTimeout(function () {
        Session.set('currencyId', 'USD');
        Session.set('dobSelect', moment().toDate());
    }, 100);
});
updateTpl.onRendered(function () {

    let id = this.data._id;
    disableDateUpdate(id);
    switcherFun();

});

//Helper

indexTpl.helpers({
    selector: function () {
        return {branchId: Session.get("currentBranch")};
    },
    tabularTable(){
        return JournalTabular;
    }
});

insertTpl.helpers({
    cssClassForSubmit: function () {
        return state.get('cssClassForSubmit');
    },
    collection(){
        return Journal;
    },
    totalDr(){
        return state.get('totalDr');
    },
    totalCr(){
        return state.get('totalCr');
    },
    voucherId: function () {
        return Session.get('lastVoucherId');
    },
    isFixAsset: function () {
        return stateFixAsset.get("isFixAsset");
    },
    fixAssetDepCollection: function (e, t) {
        return fixAssetDepCollection;
    },
    journalDetailCollection: function (e, t) {
        return journalDetailCollection;
    }
});
updateTpl.helpers({
    cssClassForSubmit: function () {
        return state.get('cssClassForSubmit');
    },
    collection(){
        return Journal;
    },
    totalDr(){
        return state.get('totalDr');
    },
    totalCr(){
        return state.get('totalCr');
    },
    isFixAsset: function () {
        return stateFixAsset.get("isFixAsset");
    },
    isChecked: function () {
        if (stateFixAsset.get('isFixAsset') == true) {
            return "checked";
        } else {
            return "";
        }
    },
    fixAssetDepCollection: function () {
        return fixAssetDepCollection;
    },
    journalDetailCollection: function () {
        return journalDetailCollection;
    }
});


//Event

indexTpl.events({
    'click .otherSystem_journalInsert': function (e, t) {
        let data = {};
        data.journalDate = moment().toDate();
        data.branchId = Session.get("currentBranch");
        data.voucherId = 2089;
        data.currencyId = 'USD';
        data.memo = 'test migrate';
        data.refId = "001";
        data.refFrom = "Sale";
        data.total=300;

        let transaction = [];

        transaction = [
            {
                account: "111102 | Cash on Hand | Other Current Asset",
                dr: 300,
                cr: 0,
                drcr: 300
            }, {
                account: "131202 | Standard Loans Individual | Other Current Asset",
                dr: 0,
                cr: 300,
                drcr: -300
            }
        ]
        data.transaction = transaction;
        Meteor.call('otherSystem_journalInsert', data);
    },
    'click .otherSystem_journalUpdate': function (e, t) {
        let journalId = this._id;

        let data = {};
        data.journalDate = moment().toDate();
        data.branchId = Session.get("currentBranch");
        data.voucherId = 2089;
        data.currencyId = 'USD';
        data.memo = 'update test migrate';
        data.refId = "001";
        data.refFrom = "Sale";
        data.total=400;

        let transaction = [];

        transaction = [
            {
                account: "131202 | Standard Loans Individual | Other Current Asset",
                dr: 400,
                cr: 0,
                drcr: 400
            }, {
                account: "521202 | Interest income (client) | Income",
                dr: 0,
                cr: 400,
                drcr: -400
            }
        ]

        data.transaction = transaction;

        Meteor.call('otherSystem_journalUpdate', data, journalId);
    },
    'click .otherSystem_journalRemove': function (e,t) {
        let self=this;

        Meteor.call('otherSystem_journalRemove', self._id,"001","Sale");
    },






    'click .insert': function (e, t) {
        stateFixAsset.set('isFixAsset', false);
        journalDetailCollection.remove({});
        alertify.journal(fa("plus", "Journal"), renderTemplate(Template.acc_journalInsert)).maximize();
    },
    'dblclick tbody > tr': function (event) {
        stateFixAsset.set('isFixAsset', false);
        Session.set('isTotal', false);

        let dataTable = $(event.target).closest('table').DataTable();
        let rowData = dataTable.row(event.currentTarget).data();

        let data = rowData;
        if (data.voucherId.length > 10) {
            data.voucherId = data.voucherId.substr(8, 6);
        }

        Session.set('dobSelect', data.journalDate);
        Session.set('currencyId', data.currencyId);

        let selectorGetLastDate = {};
        selectorGetLastDate.branchId = Session.get("currentBranch");

        if (data.transactionAsset != undefined) {
            if (data.transactionAsset.length > 0) {
                stateFixAsset.set('isFixAsset', true);
                $('.js-switch').trigger("click");
            }
        }

        Meteor.call('getDateEndOfProcess', selectorGetLastDate, function (err, lastDate) {
            if ((data && (data.endId == "0" || data.endId == undefined) ) && ((data.fixAssetExpenseId == "0" || data.fixAssetExpenseId == undefined) && (data.closingId != "0" || data.closingId != undefined ) && data.refId==undefined)) {
                if (lastDate != null) {
                    if (new Date(lastDate.closeDate) < data.journalDate) {
                        alertify.journal(fa("plus", "Journal"), renderTemplate(Template.acc_journalUpdate, data)).maximize();
                    } else {
                        alertify.error("Can not update, you already end of process!!!");
                    }
                } else {
                    alertify.journal(fa("plus", "Journal"), renderTemplate(Template.acc_journalUpdate, data)).maximize();
                }
            } else {
                alertify.warning("Can't Update!!!");
            }
        });

    }, 'click .update': function (e, t) {
        stateFixAsset.set('isFixAsset', false);
        Session.set('isTotal', false);

        let data = this;
        if (data.voucherId.length > 10) {
            data.voucherId = data.voucherId.substr(8, 6);
        }

        Session.set('dobSelect', data.journalDate);
        Session.set('currencyId', data.currencyId);

        if (data.transactionAsset != undefined) {
            if (data.transactionAsset.length > 0) {
                stateFixAsset.set('isFixAsset', true);
                $('.js-switch').trigger("click");
            }
        }
        let selectorGetLastDate = {};
        selectorGetLastDate.branchId = Session.get("currentBranch");

        Meteor.call('getDateEndOfProcess', selectorGetLastDate, function (err, lastDate) {
            if ((data && (data.endId == "0" || data.endId == undefined) ) && ((data.fixAssetExpenseId == "0" || data.fixAssetExpenseId == undefined) && (data.closingId != "0" || data.closingId != undefined ) && data.refId==undefined )) {
                if (lastDate != undefined) {
                    if (new Date(lastDate.closeDate) < data.journalDate) {
                        alertify.journal(fa("plus", "Journal"), renderTemplate(Template.acc_journalUpdate, data)).maximize();
                    } else {
                        alertify.error("Can not update, you already end of process!!!");
                    }
                } else {
                    alertify.journal(fa("plus", "Journal"), renderTemplate(Template.acc_journalUpdate, data)).maximize();
                }
            } else {
                alertify.warning("Can't Update!!!");
            }
        });
    },
    'click .remove': function (e, t) {
        var self = this;
        var selectorGetLastDate = {};
        var branchId = Session.get("currentBranch");
        selectorGetLastDate.branchId = branchId;
        var selector = {};
        selector._id = this._id;
        Meteor.call('getDateEndOfProcess', selectorGetLastDate, function (err, lastDate) {
            Meteor.call('getJournal', selector, function (err, data) {
                if ((data && (data.endId == "0" || data.endId == undefined) ) && ((data.fixAssetExpenseId == "0" || data.fixAssetExpenseId == undefined) && (data.closingId != "0" || data.closingId != undefined )  && data.refId==undefined)) {
                    if (lastDate != null) {
                        if (new Date(lastDate.closeDate) < data.journalDate) {

                            alertify.confirm(
                                fa("remove", "Order"),
                                "Are you sure to delete [" + self._id + "]?",
                                function () {
                                    Journal.remove(self._id, function (error) {
                                        if (error) {
                                            alertify.error(error.message);
                                        } else {
                                            Meteor.call('removeDepFixAsset', self._id);
                                            alertify.success("Success");
                                        }
                                    });
                                },
                                null
                            );
                        } else {
                            alertify.error("Can not Remove, you already end of process!!!");
                        }
                    } else {
                        alertify.confirm(
                            fa("remove", "Order"),
                            "Are you sure to delete [" + self._id + "]?",
                            function () {
                                Journal.remove(self._id, function (error) {
                                    if (error) {
                                        alertify.error(error.message);
                                    } else {
                                        Meteor.call('removeDepFixAsset', self._id);
                                        alertify.success("Success");
                                    }
                                });
                            },
                            null
                        );
                    }
                } else {
                    alertify.warning("Can't Remove!!!");
                }
            })
        })
    }

    ,
    'click .show': function (e, t) {
        var selector = {};
        selector._id = this._id;
        Meteor.call('getJournal', selector, function (err, data) {
            alertify.journal(fa("eye", "Journal"), renderTemplate(showTpl, data).html);
        })
    }
});
insertTpl.events({
    'keypress #voucherId': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    },
    'change #currencyId': function (e, t) {
        var currencyId = $(e.currentTarget).val();
        Session.set('currencyId', currencyId);
    },
    'blur #journalDate': function (e, t) {
        var curDate = $(e.currentTarget).val();
        Session.set('dobSelect', curDate);
    },
    'change .js-switch': function (e, t) {
        var elem = document.querySelector('.js-switch');
        stateFixAsset.set("isFixAsset", elem.checked);
    },
    'click .save-new': function (e, t) {
        Session.set('saveNew', true);
    }
});
updateTpl.events({
    'keypress #voucherId': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    },
    'change .js-switch': function (e, t) {
        var elem = document.querySelector('.js-switch');
        stateFixAsset.set("isFixAsset", elem.checked);
    },
    'change #currencyId': function (e, t) {
        var currencyId = $(e.currentTarget).val();
        Session.set('currencyId', currencyId);
    },
    'blur #journalDate': function (e, t) {
        var curDate = $(e.currentTarget).val();
        Session.set('dobSelect', curDate);
    }
});


//Hook
AutoForm.hooks({
    acc_journalInsert: {
        before: {
            insert: function (doc) {
                var currentBranch = Session.get("currentBranch");
                doc.branchId = Session.get("currentBranch");

                let transactionData = journalDetailCollection.find().fetch();
                var total = 0;
                var transactionList = [];
                transactionData.forEach(function (obj) {
                    total += obj.dr;
                    transactionList.push({account: obj.account, dr: obj.dr, cr: obj.cr, drcr: obj.dr - obj.cr})
                });
                doc.transaction = transactionList;
                let transactionAssetList = [];
                let transactionAssetData = fixAssetDepCollection.find().fetch();
                transactionAssetData.forEach(function (obj) {
                    if (obj != undefined) {
                        delete obj._id;
                        transactionAssetList.push(obj);
                    }
                })

                if (transactionAssetList.length > 0) {
                    doc.transactionAsset = transactionAssetList;
                }
                var year = moment(doc.journalDate).format("YYYY");
                doc.voucherId = currentBranch + "-" + year + s.pad(doc.voucherId, 6, "0");
                doc.total = total;
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            let curDate = Session.get('dobSelect');
            Session.set('dobSelect', undefined);
            if (Session.get('saveNew')) {
                Meteor.setTimeout(function () {
                    $("#currencyId").val(Session.get('currencyId')).trigger("change");
                    // $('#currencyId').select2('val', Session.get('currencyId'));
                    Session.set('dobSelect', curDate);
                    $("#journalDate").val(curDate).trigger("change");

                }, 100);
                Session.set('saveNew', false);
            } else {
                alertify.journal().close();
            }
            stateFixAsset.set('isFixAsset', false);
            // displaySuccess();
            alertify.success("Success");
            fixAssetDepCollection.remove({});
            journalDetailCollection.remove({});
        },
        onError: function (formType, error) {
            // displayError(error.message);
            alertify.error(error.message);
        }, onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            this.done();
        }
    },
    acc_journalUpdate: {
        before: {
            update: function (doc) {
                var year = moment(journalDate).format("YYYY");
                var currentBranch = Session.get("currentBranch");
                doc.$set.branchId = currentBranch;
                let transactionData = journalDetailCollection.find().fetch();
                var total = 0;
                var transactionList = [];
                transactionData.forEach(function (obj) {
                    total += obj.dr;
                    transactionList.push({account: obj.account, dr: obj.dr, cr: obj.cr, drcr: obj.dr - obj.cr})
                });
                doc.$set.splitAccount = transactionData.length > 2 ? this.docId : 0;
                doc.$set.total = total;
                doc.$set.transaction = transactionList;

                let transactionAssetList = [];
                let transactionAssetData = fixAssetDepCollection.find().fetch();
                transactionAssetData.forEach(function (obj) {
                    if (obj != undefined) {
                        delete obj._id;
                        transactionAssetList.push(obj);
                    }
                })
                if (transactionAssetList.length > 0) {
                    doc.$set.transactionAsset = transactionAssetList;
                }
                doc.$set.voucherId = currentBranch + "-" + year + s.pad($('[name="voucherId"]').val(), 6, "0");
                doc.$unset = {};
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            // displaySuccess();
            alertify.journal().close();
            alertify.success("Success");
            stateFixAsset.set('isFixAsset', false);
            fixAssetDepCollection.remove({});
            journalDetailCollection.remove({});
        },
        onError: function (formTupe, error) {
            // displayError(error.message);

            alertify.error(error.message);
        }, onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            this.done();
        }
    }
});

//Destroy
insertTpl.onDestroyed(function () {

    Session.set('lastVoucherId', undefined);
    Session.set('isTotal', undefined);
    Session.set('journals', undefined);
    Session.set('currencyId', undefined);
    Session.set('dobSelect', undefined);

    state.set('totalDr', 0);
    state.set('totalCr', 0);

    stateFixAsset.set('isFixAsset', false);
})

updateTpl.onDestroyed(function () {
    Session.set('currencyId', undefined);
    Session.set('isTotal', undefined);
    Session.set('journals', undefined);
    Session.set('currencyId', undefined);
    Session.set('dobSelect', undefined);
    Session.set('journalUpdate', undefined);
    Session.set('journalId', undefined);

    state.set('totalDr', 0);
    state.set('totalCr', 0);

    stateFixAsset.set('isFixAsset', false);


})


//Function
var disableDate = function () {
        var selectorGetLastDate = {};
        var branchId = Session.get("currentBranch");
        selectorGetLastDate.branchId = branchId;

        Meteor.call('getDateEndOfProcess', selectorGetLastDate, function (err, lastDate) {
            if (lastDate != null) {
                var dateVal = moment(moment(lastDate.closeDate).format("DD/MM/YYYY"), "DD/MM/YYYY").add(1, "days").toDate();
                $("#journalDate").data('DateTimePicker').minDate(dateVal);
            }
        })

    },
    disableDateUpdate = function (id) {
        var selectorGetLastDate = {};
        var selectorGetLastDateStart = {};
        var branchId = Session.get("currentBranch");
        selectorGetLastDate.branchId = branchId;
        var selector = {};
        selector._id = id;
        Meteor.call('getJournal', selector, function (err, data) {
            if (data) {
                selectorGetLastDate.closeDate = {$gt: data.journalDate};
                Meteor.call('getDateEndOfProcess', selectorGetLastDate, function (err, lastDate) {
                    selectorGetLastDateStart.branchId = branchId;
                    if (lastDate != null) {
                        selectorGetLastDateStart.closeDate = {$lt: lastDate.closeDate};
                    }
                    if (lastDate != null) {
                        Meteor.call('getDateEndOfProcess', selectorGetLastDateStart, function (err, startDate) {
                            if (startDate != null) {
                                var dateVal = moment(moment(lastDate.closeDate).format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
                                var dateValmin = moment(moment(startDate.closeDate).format("DD/MM/YYYY"), "DD/MM/YYYY").add(1, "days").toDate();
                                $("#journalDate").data('DateTimePicker').maxDate(dateVal).minDate(dateValmin);
                            } else {
                                var dateVal = moment(moment(lastDate.closeDate).format("DD/MM/YYYY"), "DD/MM/YYYY").toDate();
                                $("#journalDate").data('DateTimePicker').maxDate(dateVal);
                            }
                        })

                    } else {
                        Meteor.call('getDateEndOfProcess', selectorGetLastDateStart, function (err, startDate) {
                            if (startDate != null) {
                                var dateValmin = moment(moment(startDate.closeDate).format("DD/MM/YYYY"), "DD/MM/YYYY").add(1, "days").toDate();
                                $("#journalDate").data('DateTimePicker').minDate(dateValmin);
                            }
                        })
                    }
                })
            }
        })
    },
    switcherFun = function () {
        var elem = document.querySelector('.js-switch');
        var init = new Switchery(elem, {
            color: '#7c8bc7',
            jackColor: '#9decff',
            size: 'small'
        });
    };
