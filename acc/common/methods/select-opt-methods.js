import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {ChartAccount} from '../../imports/api/collections/chartAccount.js';
import {AccountType} from '../../imports/api/collections/accountType';
import {ChartAccountNBC} from '../../imports/api/collections/chartAccountNBC.js';
import {ChartAccountNBCKH} from '../../imports/api/collections/chartAccountNBCKH.js';
import {Currency} from '../../imports/api/collections/currency.js';

// Collection Core
import {Branch} from '../../../core/imports/api/collections/branch.js';
import {Setting} from '../../../core/imports/api/collections/setting.js';


import {SpaceChar} from '../configs/space';

export let SelectOptMethods = {};


// Acc


SelectOptMethods.depType = new ValidatedMethod({
    name: 'acc.selectOptMethods.depType',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            var typeArr = [];
            typeArr.push({
                value: '',
                label: "(Select One)"
            }, {
                value: '01: Straight Line',
                label: "01: Straight Line"
            }, {
                value: '02: Sum Of Year Digits',
                label: "02: Sum Of Year Digits"
            }, {
                value: '03: Declining Balance',
                label: "03: Declining Balance"
            })
            return typeArr;
        }
    }
});

SelectOptMethods.backupAndRestoreTypes = new ValidatedMethod({
    name: 'acc.selectOptMethods.backupAndRestoreTypes',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            return [
                {value: '', label: 'Select One'},
                {value: 'Setting', label: 'Setting'},
                {value: 'Default', label: 'Default'},
                {value: 'Setting,Default', label: 'Setting And Default'}
            ];
        }
    }
});

SelectOptMethods.branchForUser = new ValidatedMethod({
    name: 'acc.selectOptMethods.branchForUser',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            var list = [];
            if (!_.isEqual(selectOne, false)) {
                list.push({label: "All", value: ""});
            }
            var userId = _.isUndefined(userId) ? Meteor.userId() : userId;
            Meteor.users.findOne(userId).rolesBranch
                .forEach(function (branch) {
                    var label = Branch.findOne(branch).enName;
                    list.push({label: label, value: branch});
                });
            return list;
        }
    }
});

SelectOptMethods.currencyClosing = new ValidatedMethod({
    name: 'acc.selectOptMethods.currencyClosing',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            var list = [];
            list.push({label: "(Select One)", value: ""});
            var currencyBase = Setting.findOne().baseCurrency;
            Currency.find({_id: {$not: currencyBase}})
                .forEach(function (obj) {
                    list.push({label: obj._id, value: obj._id});
                });
            return list;
        }
    }
});

SelectOptMethods.currency = new ValidatedMethod({
    name: 'acc.selectOptMethods.currency',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            var list = [];
            if (!_.isEqual(selectAll, false)) {
                list.push({label: "(Select All)", value: "All"});
            }
            if (_.isEqual(selectAll, false)) {
                list.push({label: "(Select One)", value: ""});
            }
            Currency.find()
                .forEach(function (obj) {
                    list.push({label: obj._id, value: obj._id});
                });
            return list;
        }
    }
});

SelectOptMethods.chartAccountNBCKH = new ValidatedMethod({
    name: 'acc.selectOptMethods.chartAccountNBCKH',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            var selector = _.isUndefined(selector) ? {} : selector;
            var list = [{label: "(Select One)", value: ""}];
            ChartAccountNBCKH.find(selector, {sort: {code: 1}})
                .forEach(function (obj) {
                    list.push({
                        label: obj.code + " | " + obj.name,
                        value: obj._id
                    })
                });
            return list;
        }
    }
});

SelectOptMethods.chartAccountNBC = new ValidatedMethod({
    name: 'acc.selectOptMethods.chartAccountNBC',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            var selector = _.isUndefined(selector) ? {} : selector;
            var list = [{label: "(Select One)", value: ""}];
            ChartAccountNBC.find(selector, {sort: {code: 1}})
                .forEach(function (obj) {
                    list.push({
                        label: obj.code + " | " + obj.name,
                        value: obj._id
                    })
                });
            return list;
        }
    }
});

SelectOptMethods.chartAccountId = new ValidatedMethod({
    name: 'acc.selectOptMethods.chartAccountId',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            var selector = _.isUndefined(selector) ? {} : selector;
            var list = [{label: "(Select One)", value: ""}];
            ChartAccount.find(selector, {sort: {code: 1}})
                .forEach(function (obj) {
                    var accountType =AccountType.findOne(obj.accountTypeId).name;
                    list.push({
                        label: Spacebars.SafeString(SpaceChar.space(obj.level * 6) + obj.code + " | " + obj.name + " | " + accountType),
                        value: obj._id
                    })
                });
            return list;
        }
    }
});



SelectOptMethods.accountType = new ValidatedMethod({
    name: 'acc.selectOptMethods.accountType',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            var selector = _.isUndefined(selector) ? {} : selector;
            var list = [{label: "(Select One)", value: ""}];
           AccountType.find(selector)
                .forEach(function (obj) {
                    list.push({label: obj._id + " | " + obj.name, value: obj._id})
                });
            return list;
        }
    }
});

SelectOptMethods.parent = new ValidatedMethod({
    name: 'acc.selectOptMethods.parent',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            var selector = _.isUndefined(selector) ? {} : selector;
            var list = [{label: "(Select One)", value: ""}];
            ChartAccount.find(selector, {sort: {code: 1}})
                .forEach(function (obj) {
                    var accountType =AccountType.findOne(obj.accountTypeId).name;
                    list.push({
                        label: Spacebars.SafeString(SpaceChar.space(obj.level * 6) + obj.code + " | " + obj.name + "--" + accountType),
                        value: obj._id
                    })
                });
            return list;
        }
    }
});

SelectOptMethods.fixAssetExpenseList = new ValidatedMethod({
    name: 'acc.selectOptMethods.fixAssetExpenseList',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            var listChartAccount = [{label: "(Select One)", value: ""}];
            ChartAccount.find({accountTypeId: '50'}, {sort: {code: 1}})
                .forEach(function (obj) {
                    listChartAccount.push({
                        label: Spacebars.SafeString(SpaceChar.space(obj.level * 6) + obj.code + " | " + obj.name),
                        value:  obj._id
                    })
                });
            return listChartAccount;
        }
    }
});

SelectOptMethods.fixAssetList = new ValidatedMethod({
    name: 'acc.selectOptMethods.fixAssetList',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            var listChartAccount = [{label: "(Select One)", value: ""}];
            ChartAccount.find({accountTypeId: '11'}, {sort: {code: 1}})
                .forEach(function (obj) {
                    listChartAccount.push({
                        label: Spacebars.SafeString(SpaceChar.space(obj.level * 6) + obj.code + " | " + obj.name),
                        value: obj._id
                    })
                });
            return listChartAccount;
        }
    }
});

SelectOptMethods.fixAssetChatAccount = new ValidatedMethod({
    name: 'acc.selectOptMethods.fixAssetChatAccount',
    validate: null,
    run(options) {
        if (!this.isSimulation) {
            this.unblock();

            var listChartAccount = [];
            ChartAccount.find({accountTypeId: '11'}, {sort: {code: 1}})
                .forEach(function (obj) {
                    listChartAccount.push({
                        label: Spacebars.SafeString(SpaceChar.space(obj.level * 6) + obj.code + " | " + obj.name),
                        value:  obj.code + " | " + obj.name
                    })
                });
            return listChartAccount;
        }
    }
});
