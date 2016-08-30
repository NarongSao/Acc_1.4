import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

import {MapNBCBalance} from '../../imports/api/collections/mapNBCBalance';
Meteor.startup(function () {
    if (MapNBCBalance.find().count() == 0) {

        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0027',
                accountDocNBC: {
                    _id: "0027",
                    code: '1.1',
                    name: 'Cash, cheques and other items',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0028',
                accountDocNBC: {
                    _id: "0028",
                    code: '1.2',
                    name: 'Balance with NBC',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0029',
                accountDocNBC: {
                    _id: "0029",
                    code: '1.3',
                    name: 'Accounts with banks and other financial institutions',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0030',
                accountDocNBC: {
                    _id: "0030",
                    code: '1.4',
                    name: 'Interest receivable',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0031',
                accountDocNBC: {
                    _id: "0031",
                    code: '2.1',
                    name: 'Total loans outstanding',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0032',
                accountDocNBC: {
                    _id: "0032",
                    code: '2.2',
                    name: 'Less: Loan loss reserve',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0033',
                accountDocNBC: {
                    _id: "0033",
                    code: '2.3',
                    name: 'Interest receivable(Net)',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0034',
                accountDocNBC: {
                    _id: "0034",
                    code: '3',
                    name: 'Prepayments and Short-term Receivables',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0035',
                accountDocNBC: {
                    _id: "0035",
                    code: '4',
                    name: 'Long Term Investments',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0036',
                accountDocNBC: {
                    _id: "0036",
                    code: '5.1.1',
                    name: 'Land at cost',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0037',
                accountDocNBC: {
                    _id: "0037",
                    code: '5.1.2',
                    name: 'Less: accumulated depreciation land',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0038',
                accountDocNBC: {
                    _id: "0038",
                    code: '5.2.1',
                    name: 'Building at cost',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0039',
                accountDocNBC: {
                    _id: "0039",
                    code: '5.2.2',
                    name: 'Less: accumulated depreciation building',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0040',
                accountDocNBC: {
                    _id: "0040",
                    code: '5.3.1',
                    name: 'Other fixed assets at cost',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0041',
                accountDocNBC: {
                    _id: "0041",
                    code: '5.3.2',
                    name: 'Less: accumulated depreciation other fixed assets',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0042',
                accountDocNBC: {
                    _id: "0042",
                    code: '6',
                    name: 'Other Assets',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0043',
                accountDocNBC: {
                    _id: "0043",
                    code: '7.1',
                    name: 'Compulsory savings',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0044',
                accountDocNBC: {
                    _id: "0044",
                    code: '7.2.1',
                    name: 'Savings deposits',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0045',
                accountDocNBC: {
                    _id: "0045",
                    code: '7.2.2',
                    name: 'Demand deposits',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0046',
                accountDocNBC: {
                    _id: "0046",
                    code: '7.2.3',
                    name: 'Term deposits',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0047',
                accountDocNBC: {
                    _id: "0047",
                    code: '7.2.4',
                    name: 'Other deposits',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0048',
                accountDocNBC: {
                    _id: "0048",
                    code: '7.3',
                    name: 'Interest payable',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0049',
                accountDocNBC: {
                    _id: "0049",
                    code: '7.4',
                    name: 'Other',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0050',
                accountDocNBC: {
                    _id: "0050",
                    code: '8',
                    name: 'Account Payable and Other Liabilities',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0051',
                accountDocNBC: {
                    _id: "0051",
                    code: '9',
                    name: 'Accrued Expenses and provisions',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0052',
                accountDocNBC: {
                    _id: "0052",
                    code: '10.1',
                    name: 'Loans payable,short-term',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0053',
                accountDocNBC: {
                    _id: "0053",
                    code: '10.2',
                    name: 'Loans payable,Long-term',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0054',
                accountDocNBC: {
                    _id: "0054",
                    code: '11',
                    name: 'Deferred Revenue',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0055',
                accountDocNBC: {
                    _id: "0055",
                    code: '12',
                    name: 'Suspense,Clearing and interbranch Accounts',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0056',
                accountDocNBC: {
                    _id: "0056",
                    code: '13',
                    name: 'Other Liabilities',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0057',
                accountDocNBC: {
                    _id: "0057",
                    code: '14.1',
                    name: 'Paid-up Capital',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0058',
                accountDocNBC: {
                    _id: "0058",
                    code: '14.2',
                    name: 'Premium on Share Capital',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0059',
                accountDocNBC: {
                    _id: "0059",
                    code: '14.3',
                    name: 'Donaded Capital',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0060',
                accountDocNBC: {
                    _id: "0060",
                    code: '14.4',
                    name: 'Hybrid Capital Investment',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0061',
                accountDocNBC: {
                    _id: "0061",
                    code: '14.5',
                    name: 'Reserves and appropriations',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalance.insert(
            {
                chartAccountNBCId: '0062',
                accountDocNBC: {
                    _id: "0062",
                    code: '14.6',
                    name: 'Retain Earnings',
                    accountTypeNBC: "Balance"
                }
            }
        );
    }
});