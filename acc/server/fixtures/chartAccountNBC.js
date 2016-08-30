import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

import {ChartAccountNBC} from '../../imports/api/collections/chartAccountNBC';
Meteor.startup(function () {
    if (ChartAccountNBC.find().count() == 0) {

        ChartAccountNBC.insert(
            {
                _id: "0001",
                code: '1.1',
                name: 'Loans and Advances to customers',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {

                _id: "0002",
                code: '1.2',
                name: 'Accounts with Banks and Fin. Institutions',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {

                _id: "0003",
                code: '1.3',
                name: 'Balances with NBC',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0004",
                code: '1.4',
                name: 'Other',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0005",
                code: '2.1',
                name: 'Customer deposits',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0006",
                code: '2.2',
                name: 'Amounts owing to Banks and other Fin.',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0007",
                code: '2.3',
                name: 'Others',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0008",
                code: '4.1',
                name: 'Non-interest Income',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0009",
                code: '4.2',
                name: 'Non-interest Expenses',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0010",
                code: '5.1',
                name: 'Foreign Exchange Gain',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0063",
                code: '5.2',
                name: 'Loss on Foreign Exchange',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0011",
                code: '6',
                name: 'Other Income',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0012",
                code: '8',
                name: 'Program Expenses',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0013",
                code: '9.1',
                name: 'Personnel Expenses',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0014",
                code: '9.2',
                name: 'Officed Expenses',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0015",
                code: '9.3',
                name: 'Occupancy Expenses',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0016",
                code: '9.4',
                name: 'Travel Expenses',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0017",
                code: '9.5',
                name: 'Depreciation and amortization ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0018",
                code: '10',
                name: 'Taxes',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0019",
                code: '11',
                name: 'Other Charges',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0020",
                code: '12.1',
                name: 'General loan loss provisions',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0021",
                code: '12.2',
                name: 'Specific loan provisions',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0022",
                code: '12.3',
                name: 'Interest loss provision',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0023",
                code: '14',
                name: 'Grand Income',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0024",
                code: '15',
                name: 'Extraodinary Items',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0025",
                code: '17',
                name: 'Tax on Profit',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0026",
                code: '19',
                name: 'Dividend Payments',
                accountTypeNBC: "Income"
            }
        );


        ChartAccountNBC.insert(
            {
                _id: "0027",
                code: '1.1',
                name: 'Cash, cheques and other items',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0028",
                code: '1.2',
                name: 'Balance with NBC',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0029",
                code: '1.3',
                name: 'Accounts with banks and other financial institutions',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0030",
                code: '1.4',
                name: 'Interest receivable',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0031",
                code: '2.1',
                name: 'Total loans outstanding',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0032",
                code: '2.2',
                name: 'Less: Loan loss reserve',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0033",
                code: '2.3',
                name: 'Interest receivable(Net)',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0034",
                code: '3',
                name: 'Prepayments and Short-term Receivables',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0035",
                code: '4',
                name: 'Long Term Investments',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0036",
                code: '5.1.1',
                name: 'Land at cost',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0037",
                code: '5.1.2',
                name: 'Less: accumulated depreciation land',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0038",
                code: '5.2.1',
                name: 'Building at cost',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0039",
                code: '5.2.2',
                name: 'Less: accumulated depreciation building',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0040",
                code: '5.3.1',
                name: 'Other fixed assets at cost',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0041",
                code: '5.3.2',
                name: 'Less: accumulated depreciation other fixed assets',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0042",
                code: '6',
                name: 'Other Assets',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0043",
                code: '7.1',
                name: 'Compulsory savings',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0044",
                code: '7.2.1',
                name: 'Savings deposits',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0045",
                code: '7.2.2',
                name: 'Demand deposits',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0046",
                code: '7.2.3',
                name: 'Term deposits',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0047",
                code: '7.2.4',
                name: 'Other deposits',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0048",
                code: '7.3',
                name: 'Interest payable',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0049",
                code: '7.4',
                name: 'Other',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0050",
                code: '8',
                name: 'Account Payable and Other Liabilities',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0051",
                code: '9',
                name: 'Accrued Expenses and provisions',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0052",
                code: '10.1',
                name: 'Loans payable,short-term',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0053",
                code: '10.2',
                name: 'Loans payable,Long-term',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0054",
                code: '11',
                name: 'Deferred Revenue',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0055",
                code: '12',
                name: 'Suspense,Clearing and interbranch Accounts',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0056",
                code: '13',
                name: 'Other Liabilities',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0057",
                code: '14.1',
                name: 'Paid-up Capital',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0058",
                code: '14.2',
                name: 'Premium on Share Capital',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0059",
                code: '14.3',
                name: 'Donaded Capital',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0060",
                code: '14.4',
                name: 'Hybrid Capital Investment',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0061",
                code: '14.5',
                name: 'Reserves and appropriations',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBC.insert(
            {
                _id: "0062",
                code: '14.6',
                name: 'Retain Earnings',
                accountTypeNBC: "Balance"
            }
        );
    }
});
