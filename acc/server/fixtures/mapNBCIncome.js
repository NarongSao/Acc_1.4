import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

import {MapNBCIncome} from '../../imports/api/collections/mapNBCIncome';
Meteor.startup(function () {
    if (MapNBCIncome.find().count() == 0) {

        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0001',
                accountDocNBC: {
                    "_id": "0024",
                    "code": "1.1",
                    "name": "Loans and Advances to customers",
                    "accountTypeNBC": "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {

                chartAccountNBCId: '0002',
                accountDocNBC: {
                    _id: "0002",
                    code: '1.2',
                    name: 'Accounts with Banks and Fin. Institutions',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {

                chartAccountNBCId: '0003',
                accountDocNBC: {
                    _id: "0003",
                    code: '1.3',
                    name: 'Balances with NBC',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0004',
                accountDocNBC: {
                    _id: "0004",
                    code: '1.4',
                    name: 'Other',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0005',
                accountDocNBC: {
                    _id: "0005",
                    code: '2.1',
                    name: 'Customer deposits',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0006',
                accountDocNBC: {
                    _id: "0006",
                    code: '2.2',
                    name: 'Amounts owing to Banks and other Fin.',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0007',
                accountDocNBC: {
                    _id: "0007",
                    code: '2.3',
                    name: 'Others',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0008',
                accountDocNBC: {
                    _id: "0008",
                    code: '4.1',
                    name: 'Non-interest Income',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0009',
                accountDocNBC: {
                    _id: "0009",
                    code: '4.2',
                    name: 'Non-interest Expenses',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0010',
                accountDocNBC: {
                    _id: "0010",
                    code: '5.1',
                    name: 'Foreign Exchange Gain',
                    accountTypeNBC: "Income"
                }
            }
        );MapNBCIncome.insert(
            {
                chartAccountNBCId: '0063',
                accountDocNBC: {
                    _id: "0063",
                    code: '5.2',
                    name: 'Loss on Foreign Exchange',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0011',
                accountDocNBC: {
                    _id: "0011",
                    code: '6',
                    name: 'Other Income',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0012',
                accountDocNBC: {
                    _id: "0012",
                    code: '8',
                    name: 'Program Expenses',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0013',
                accountDocNBC: {
                    _id: "0013",
                    code: '9.1',
                    name: 'Personnel Expenses',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0014',
                accountDocNBC: {
                    _id: "0014",
                    code: '9.2',
                    name: 'Officed Expenses',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0015',
                accountDocNBC: {
                    _id: "0015",
                    code: '9.3',
                    name: 'Occupancy Expenses',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0016',
                accountDocNBC: {
                    _id: "0016",
                    code: '9.4',
                    name: 'Travel Expenses',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0017',
                accountDocNBC: {
                    _id: "0017",
                    code: '9.5',
                    name: 'Depreciation and amortization ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0018',
                accountDocNBC: {
                    _id: "0018",
                    code: '10',
                    name: 'Taxes',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0019',
                accountDocNBC: {
                    _id: "0019",
                    code: '11',
                    name: 'Other Charges',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0020',
                accountDocNBC: {
                    _id: "0020",
                    code: '12.1',
                    name: 'General loan loss provisions',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0021',
                accountDocNBC: {
                    _id: "0021",
                    code: '12.2',
                    name: 'Specific loan provisions',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0022',
                accountDocNBC: {
                    _id: "0022",
                    code: '12.3',
                    name: 'Interest loss provision',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0023',
                accountDocNBC: {
                    _id: "0023",
                    code: '14',
                    name: 'Grand Income',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0024',
                accountDocNBC: {
                    _id: "0024",
                    code: '15',
                    name: 'Extraodinary Items',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0025',
                accountDocNBC: {
                    _id: "0025",
                    code: '17',
                    name: 'Tax on Profit',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncome.insert(
            {
                chartAccountNBCId: '0026',
                accountDocNBC: {
                    _id: "0026",
                    code: '19',
                    name: 'Dividend Payments',
                    accountTypeNBC: "Income"
                }
            }
        );
    }
});