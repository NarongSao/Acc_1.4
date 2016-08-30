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

// Profit Lost Comparation
import '../imports/ui/pages/chart/profitLostComparation/profitLostComparation';
AccRoutes.route('/chartProfitLostComparation', {
    name: 'acc.chartProfitLostComparation',
    title: __('acc.chartProfitLostComparation.title'),
    action: function(params, queryParams) {
        Layout.main('acc_chartProfitLostComparation');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Chart Profit Lost Comparation',
        parent: 'acc.home'
    }
});
