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
import {FixAssetDep} from '../../../api/collections/fixAssetDep';


// Tabular
import {FixAssetDepTabular} from '../../../../common/tabulars/fixAssetDep';

// Page
import './fixAssetDep.html';
import '../../libs/getBranch';

// Declare template
var fixAssetDepTpl = Template.acc_fixAssetDep,
    fixAssetListTPL = Template.acc_fixAssetDepList,
    fixAssetDepSummaryListTpl = Template.acc_fixAssetDepSummaryList;


fixAssetDepTpl.onRendered(function () {
    createNewAlertify("fixAssetDep");

})

fixAssetDepTpl.helpers({
    tabularTable(){
        return FixAssetDepTabular;
    },
    selector: function () {
        return {branchId: Session.get("currentBranch")};
    }
})


fixAssetDepTpl.events({
    'click .depList': function (e, t) {
        var self = this;

        var params = {};
        var queryParams = {};

        queryParams.branchId = Session.get("currentBranch");
        queryParams.journalId = self.journalId;

        var path = FlowRouter.path("acc.fixAssetDepList", params, queryParams);

        window.open(path, "_blank");

    },
    'click .fixedAssetSummaryDepreciation': function (e, t) {
        var self = this;

        var params = {};
        var queryParams = {};

        queryParams.branchId = Session.get("currentBranch");

        var path = FlowRouter.path("acc.fixAssetDepSummaryList", params, queryParams);

        window.open(path, "_blank");

    }
});


fixAssetListTPL.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            //fontSize: 'bg',
            paper: 'a4',
            orientation: 'portrait'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        Fetcher.setDefault('data', false);
        Fetcher.retrieve('data', 'acc_fixAssetDepList', q);

        return Fetcher.get('data');
    }
})

fixAssetDepSummaryListTpl.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            //fontSize: 'bg',
            paper: 'a4',
            orientation: 'portrait'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        Fetcher.setDefault('data', false);
        Fetcher.retrieve('data', 'acc_fixAssetDepSummaryList', q);

        return Fetcher.get('data');
    }
})