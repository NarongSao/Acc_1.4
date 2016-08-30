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
import {ChartAccount} from '../../../api/collections/chartAccount.js';
import {AccountType} from '../../../api/collections/accountType.js';

// Tabular
import {ChartAccountTabular} from '../../../../common/tabulars/chartAccount.js';

// Page
import './chartAccount.html';

// Declare template
/**
 * Index
 */
// var actionTpl=Template.acc_chartAccountAction;
Template.acc_chartAccount.onRendered(function () {
    /* Create new alertify */
    createNewAlertify("chartAccount");
});

var actionTpl = Template.acc_chartAccountAction;
Template.acc_chartAccount.helpers({
    tabularTable(){
        return ChartAccountTabular;
    },
    tableSettings(){
        let i18nPrefix = 'acc.chartAccount.schema';

        reactiveTableSettings.collection = 'acc.reactiveTable.chartAccount';
        // reactiveTableSettings.filters = ['acc.customerByBranchFilter'];
        reactiveTableSettings.fields = [
            {
                key: '_id',
                label:"Id",

                sortOrder: 0,
                sortDirection: 'asc'
            },
            {key: 'code', label: "Code"},
            {key: 'name', label: "Name"},
            {key: 'parentId', label:"Parent",
                fn (value, object, key) {
                    var result = "";
                    if (value != null) {
                        re = ChartAccount.findOne({
                            _id: value
                        });
                        result = re.code + " | " + re.name;
                    }
                    return result;
                }
            },
            {
                key: 'accountTypeId', label:"AccountType",
                fn (value, object, key) {
                    return AccountType.findOne({
                        _id: value
                    }).name;
                }
            },

            {
                key: '_id',
                label(){
                    return fa('bars', '', true);
                },
                headerClass: function () {
                    let css = 'text-center col-action';
                    return css;
                },
                tmpl: actionTpl, sortable: false
            }
        ];
        return reactiveTableSettings;
    }
})

// New
Template.acc_chartAccountInsert.helpers({
    collection(){
        return ChartAccount;
    }
});
// Update
Template.acc_chartAccountUpdate.helpers({
    collection(){
        return ChartAccount;
    }
});

Template.acc_chartAccount.events({
    'click .insert': function (e, t) {
        alertify.chartAccount(fa("plus", "Chart of Account"), renderTemplate(Template.acc_chartAccountInsert));

        /*.maximize();*/

    },
    'click .update': function (e, t) {
        var selector = {};
        selector._id = this._id;
        Meteor.call('getChartAccount', selector, function (err, data) {
            if (!err) {
                var name = data.name;
                var n = name.split(" : ");
                //var n = s.words(name, " : ");
                data.name = n[n.length - 1];
                alertify.chartAccount(fa("pencil", "Chart of Account"), renderTemplate(Template.acc_chartAccountUpdate,
                    data));
            }
        })
    },
    'click .remove': function (e, t) {
        var id = this._id;
        alertify.confirm("Are you sure to delete [" + id + "]?")
            .set({
                onok: function (closeEvent) {

                    ChartAccount.remove(id, function (error) {
                        if (error) {
                            alertify.error(error.message);
                        } else {
                            alertify.success("Success");
                        }
                    });
                },
                title: fa("remove", "Chart of Account")
            });

    },
    'click .show': function (e, t) {
        alertify.alert(renderTemplate(Template.acc_chartAccountShow, this).html)
            .set({
                title: fa("eye", "Chart of Account")
            });
    }
});
/**
 * Insert
 */
Template.acc_chartAccountInsert.helpers({
    accountTypeOpt: function () {
        if (Session.get('accountTypeId') == null) {
            return AccountType.find()
                .map(function (obj) {
                    return {
                        label: obj._id + " | " + obj.name,
                        value: obj._id
                    };
                });

        } else {
            var obj = AccountType.findOne(Session.get(
                'accountTypeId'));
            return [{
                label: obj._id + " | " + obj.name,
                value: obj._id
            }];
            //return Acc.List.accountType();
        }
    },
    accountTypeValue: function () {
        return Session.get('accountTypeId');
    }
});

Template.acc_chartAccountInsert.events({
    'change #parentId': function () {

        var parent = ChartAccount.findOne($('#parentId').val());
        if (parent == null) {
            Session.set('accountTypeId', null);
        } else {
            Session.set('accountTypeId', parent.accountTypeId);
        }

    },
    'submit .preventDef': function (evt, t) {
        evt.preventDefault();
    }
});
/**
 * Update
 */
Template.acc_chartAccountUpdate.helpers({
    accountTypeOpt: function () {
        ///
        if (Session.get('accountTypeId') == null) {
            return AccountType.find()
                .map(function (obj) {
                    return {
                        label: obj._id + " | " + obj.name,
                        value: obj._id
                    };
                });

        } else {
            var obj = AccountType.findOne(Session.get(
                'accountTypeId'));
            return [{
                label: obj._id + " | " + obj.name,
                value: obj._id
            }];
            /*return Acc.List.accountType();*/
        }
    }
});

Template.acc_chartAccountUpdate.events({
    'change #parentId': function () {
        var parent = ChartAccount.findOne($('#parentId').val());
        if (parent == null) {
            Session.set('accountTypeId', null);
        } else {
            Session.set('accountTypeId', parent.accountTypeId);
            $('#accountTypeId').val(parent.accountTypeId);
        }

    },
    'submit .preventDef': function (evt) {
        evt.preventDefault();
    }
});
/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    acc_chartAccountInsert: {
        before: {
            insert: function (doc) {
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        },
        after: {
            insert: function () {
                $('#accountTypeId').val('');
            }
        }
    },
    acc_chartAccountUpdate: {
        /* before: {
         update: function (doc) {

         var checkParent = Acc.Collection.ChartAccount.findOne({parentId: doc.$set.parentId});
         if (checkParent != null) {
         doc.$set.name = checkParent.name + " : " + doc.$set.name;
         }
         return doc;
         }
         },*/
        onSuccess: function (formType, result) {
            alertify.chartAccount().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
