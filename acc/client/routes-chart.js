import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {FlowRouterTitle} from 'meteor/ostrio:flow-router-title';
import 'meteor/arillo:flow-router-helpers';
import 'meteor/zimme:active-route';
import 'meteor/theara:flow-router-breadcrumb';

// Lib
import {__} from '../../core/common/libs/tapi18n-callback-helper.js';

// Layout
import {Layout} from '../../core/client/libs/render-layout.js';
import '../../core/imports/ui/layouts/login';
import '../../core/imports/ui/layouts/main';

// import './subscription/subscriptionGlobal.js'

// Group
let AccRoutes = FlowRouter.group({
    prefix: '/acc',
    title: "Accounting",
    titlePrefix: 'Accounting> ',
    subscriptions: function (params, queryParams) {
//     this.register('files', Meteor.subscribe('files'));
    }
});



// net Income
import '../imports/ui/pages/chart/netIncome/netIncome';
AccRoutes.route('/chartNetIncome', {
    name: 'acc.chartNetIncome',
    title: __('acc.chartNetIncome.title'),
    subscriptions: function (params, queryParams) {
        this.register('acc.netIncome', Meteor.subscribe('acc.netIncome'));
    },
    action: function(params, queryParams) {
        Layout.main('acc_chartNetIncome');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Chart NetIncome',
        parent: 'acc.home'
    }
});

// Account Comparation
import '../imports/ui/pages/chart/accountComparation/accountComparation';
AccRoutes.route('/chartAccountComparation', {
    name: 'acc.accountComparation',
    title: __('acc.accountComparation.title'),
    action: function(params, queryParams) {
        Layout.main('acc_accountComparation');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Chart Account Comparation',
        parent: 'acc.home'
    }
});
