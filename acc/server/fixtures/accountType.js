import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

import {AccountType} from '../../imports/api/collections/accountType';

Meteor.startup(function () {
    if (AccountType.find().count() == 0) {
        AccountType.insert(
            {
                _id: '10',
                name: 'Other Current Asset'
            }
        );
        AccountType.insert(
            {
                _id: '11',
                name: 'Fixed Asset'
            }
        );
        AccountType.insert(
            {
                _id: '12',
                name: 'Other Asset'
            }
        );
        AccountType.insert(
            {
                _id: '20',
                name: 'Other Current Liability'
            }
        );
        AccountType.insert(
            {
                _id: '21',
                name: 'Long Term Liability'
            }
        );
        AccountType.insert(
            {
                _id: '30',
                name: 'Equity'
            }
        );
        AccountType.insert(
            {
                _id: '40',
                name: 'Income'
            }
        );
        AccountType.insert(
            {
                _id: '41',
                name: 'Other Income'
            }
        );
        AccountType.insert(
            {
                _id: '50',
                name: 'Expense'
            }
        );
        AccountType.insert(
            {
                _id: '51',
                name: 'Other Expense'
            }
        );

    }
});