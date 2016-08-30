import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {_} from 'meteor/erasaur:meteor-lodash';
import {moment} from  'meteor/momentjs:moment';

// Collection
import {Company} from '../../../../core/imports/api/collections/company.js';
import {Setting} from '../../../../core/imports/api/collections/setting';
import {Currency} from '../../../../core/imports/api/collections/currency';
import {Exchange} from '../../../../core/imports/api/collections/exchange';
import {DepExpList} from '../../../imports/api/collections/depExpList';
import {ConfigDep} from '../../../imports/api/collections/configDep';

Meteor.methods({
    acc_fixAssetDepList: function (params) {
        if (!this.isSimulation) {
            var data = {
                title: {},
                header: {},
                content: [{
                    index: 'No Result'
                }],
                footer: {}
            };


            /****** Title *****/
            data.title = Company.findOne();

            /****** Header *****/
            data.header = params;
            /****** Content *****/

            var self = params;
            var selector = {};
            var content = "";

            selector.journalId = self.journalId;
            selector.branchId = self.branchId;
            var depList = DepExpList.find(selector).fetch();

            if (depList.length != 0) {
                depList.forEach(function (obj) {
                    var cumDeprec = 0;
                    var bvEndYear = obj.amount;
                    content += "<tr style='background-color: #e5e5e5'><td colspan='6'>" + obj.account + " : " + obj.amount + getCurrenySymbol(obj.currencyId) + "</td></tr>";
                    obj.transactionAsset.forEach(function (ob) {
                        cumDeprec += ob.perYear;
                        bvEndYear -= ob.perYear;
                        content += "<tr><td>" + ob.year + "</td><td>" + ob.perMonth + "</td><td>" + ob.perYear + "</td><td>" + numeral().unformat(numeral(cumDeprec).format('0,0.00')) + "</td><td>" + numeral().unformat(numeral(bvEndYear).format('0,0.00')) + "</td><td>" + ob.month + "</td></tr>";
                    })
                })
            }
            data.content = content;
            return data;
        }
    },

    acc_fixAssetDepSummaryList: function (params) {
        if (!this.isSimulation) {
            var data = {
                title: {},
                header: {},
                content: [{
                    index: 'No Result'
                }],
                footer: {}
            };


            /****** Title *****/
            data.title = Company.findOne();

            /****** Header *****/
            params.date = moment().format('DD/MMMM/YYYY');
            data.header = params;
            /****** Content *****/

            var self = params;
            var selector = {};
            var content = "";


            selector.branchId = self.branchId;
            selector.isDep = false;


            var depList = DepExpList.find(selector).fetch();
            var depConfig = ConfigDep.findOne({});

            var accountShow = "";
            if (depList.length != 0) {
                depList.sort(compareASD);
                var i = 0;
                var totalAmount = 0;
                var totalCumDeprec = 0;
                var totalDepExp = 0;
                var totalNetBookValue = 0;
                var baseCurrency = Setting.findOne({}).baseCurrency;
                var mainCurrency = getCurrenySymbol(baseCurrency)

                var exchangeId = Exchange.findOne({}, {sort: {_id: -1}})._id;
                depList.forEach(function (obj) {


                    var cumDeprec = 0;
                    var monthDep = 0;
                    var depExp = 0;

                    obj.transactionAsset.forEach(function (ob) {

                        var depMonth = ob.maxMonth < depConfig.depPerTime ? ob.maxMonth : depConfig.depPerTime;
                        if (ob.month != 0) {
                            monthDep += ob.month;
                            cumDeprec += ob.month * ob.perMonth;
                            depExp = depMonth * ob.perMonth;
                        }
                    })
                    var currency = getCurrenySymbol(obj.currencyId);
                    if (accountShow != obj.account && i > 1) {
                        content += "<tr><td colspan='4' style='border-bottom: none' align='center'>Total</td><td>" + numeral(totalAmount).format('0,0.00') + currency + "</td><td colspan='2'></td><td>" + numeral(totalDepExp).format('0,0.00') + currency + "</td><td>" + numeral(totalCumDeprec).format('0,0.00') + currency + "</td><td>" + numeral(totalNetBookValue).format('0,0.00') + currency + "</td></tr>";
                    }

                    if (accountShow != obj.account) {
                        totalAmount = 0;
                        totalCumDeprec = 0;
                        totalDepExp = 0;
                        totalNetBookValue = 0;

                        i = 1;
                        content += "<tr style='background-color: lightgrey'><td colspan='10' style='border-bottom: none'>" + obj.account + "</td></tr>";
                    }

                    content += "<tr><td>" + i + "</td><td>" + obj.code + "</td><td>" + obj.description + "</td><td>" + moment(obj.date).format("DD-MM-YYYY") + "</td><td>" + numeral(obj.amount).format('0,0.00') + currency + "</td><td>" + obj.percent + "%</td><td>" + monthDep + "</td><td>" + numeral(depExp).format('0,0.00') + currency + "</td><td>" + numeral(cumDeprec).format('0,0.00') + currency + "</td><td>" + numeral(obj.estSalvage).format('0,0.00') + currency + "</td></tr>";
                    accountShow = obj.account;
                    i++;


                    totalAmount += (Meteor.call('exchange', obj.currencyId, baseCurrency, obj.amount, exchangeId));
                    totalCumDeprec += (Meteor.call('exchange', obj.currencyId, baseCurrency, cumDeprec, exchangeId));
                    ;
                    totalDepExp += (Meteor.call('exchange', obj.currencyId, baseCurrency, depExp, exchangeId));
                    ;
                    totalNetBookValue += (Meteor.call('exchange', obj.currencyId, baseCurrency, obj.estSalvage, exchangeId));
                    ;

                })
                content += "<tr><td colspan='4' style='border-bottom: none' align='center'>Total</td><td>" + numeral(totalAmount).format('0,0.00') + mainCurrency + "</td><td colspan='2'></td><td>" + numeral(totalDepExp).format('0,0.00') + mainCurrency + "</td><td>" + numeral(totalCumDeprec).format('0,0.00') + mainCurrency + "</td><td>" + numeral(totalNetBookValue).format('0,0.00') + mainCurrency + "</td></tr>";
            }
            data.content = content;
            return data;
        }
    }
});

var getCurrenySymbol =function (id) {
    let currency=Currency.findOne(id);
    if(currency){
        return currency.symbol;
    }
}

var compareASD=function (a, b) {
    if (a.account < b.account) {
        return -1;
    } else if (a.account > b.account) {
        return 1;
    } else {
        return 0;
    }
}