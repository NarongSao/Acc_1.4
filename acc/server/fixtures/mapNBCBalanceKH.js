import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

import {MapNBCBalanceKH} from '../../imports/api/collections/mapNBCBalanceKH';
Meteor.startup(function () {
    if (MapNBCBalanceKH.find().count() == 0) {

        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0039',
                accountDocNBC: {
                    _id: "0039",
                    code: '1.1',
                    name: 'ប្រតិបត្តិការជាមួយគ្រឹះស្ថានហិរញ្ញវត្ថុផ្សេងៗ',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0040',
                accountDocNBC: {
                    _id: "0040",
                    code: '1.2',
                    name: 'ប្រតិបត្តិការជាមួយអតិថិជន',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0041',
                accountDocNBC: {
                    _id: "0041",
                    code: '1.3',
                    name: 'ចំណូលការប្រាក់ផ្សេងៗ',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0042',
                accountDocNBC: {
                    _id: "0042",
                    code: '2.1',
                    name: 'ខ្ចីពីគ្រឹះស្ថានហិរញ្ញវត្ថុនានា',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0043',
                accountDocNBC: {
                    _id: "0043",
                    code: '2.2',
                    name: 'ប្រាក់បញ្ញើអតិថិជន',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0044',
                accountDocNBC: {
                    _id: "0044",
                    code: '2.3',
                    name: 'ចំណាយការប្រាក់ផ្សេងទៀត',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0045',
                accountDocNBC: {
                    _id: "0045",
                    code: '4.1.1',
                    name: 'ចំណូលដែលទទួលបាន',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0046',
                accountDocNBC: {
                    _id: "0046",
                    code: '4.1.2',
                    name: 'ចំណាយដែលកើតឡើង',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0047',
                accountDocNBC: {
                    _id: "0047",
                    code: '4.2',
                    name: 'ចំណេញ(ខាត)ពីការប្តូរប្រាក់',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0048',
                accountDocNBC: {
                    _id: "0048",
                    code: '4.3',
                    name: 'ចំណូលមិនមែនការប្រាក់ផ្សេងៗ',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0049',
                accountDocNBC: {
                    _id: "0049",
                    code: '6.1',
                    name: 'បៀវត្សនិងឧបត្ថម្ភ',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0050',
                accountDocNBC: {
                    _id: "0050",
                    code: '6.2',
                    name: 'ចំណាយផ្សេងទៀតលើបុគ្គលិក',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0051',
                accountDocNBC: {
                    _id: "0051",
                    code: '6.3',
                    name: 'ចំណាយជួល',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0052',
                accountDocNBC: {
                    _id: "0052",
                    code: '6.4',
                    name: 'ចំណាយលើអគារ',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0053',
                accountDocNBC: {
                    _id: "0053",
                    code: '6.5',
                    name: 'ចំណាយលើទព្វសំភារៈ',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0054',
                accountDocNBC: {
                    _id: "0054",
                    code: '6.6',
                    name: 'ចំណាយរដ្ឋបាល',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0055',
                accountDocNBC: {
                    _id: "0055",
                    code: '6.7',
                    name: 'ចំណាយរំលស់',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0056',
                accountDocNBC: {
                    _id: "0056",
                    code: '6.8.1',
                    name: 'ក្នុងនោះជាមួយធនាគារជាតិ',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0057',
                accountDocNBC: {
                    _id: "0057",
                    code: '6.9',
                    name: 'ចំណាយផ្សេងទៀតលើប្រតិបត្តិការ',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0058',
                accountDocNBC: {
                    _id: "0058",
                    code: '8.1',
                    name: 'សំវិធានធនលើឥណទានបាត់បង់',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0059',
                accountDocNBC: {
                    _id: "0059",
                    code: '8.2',
                    name: 'ទារបានវិញ',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0060',
                accountDocNBC: {
                    _id: "0060",
                    code: '8.3',
                    name: 'ផ្សេងៗ',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0061',
                accountDocNBC: {
                    _id: "0061",
                    code: '9.1.1',
                    name: 'ដែលក្នុងនោះជាអំណោយ',
                    accountTypeNBC: "Balance"
                }
            }
        );
        MapNBCBalanceKH.insert(
            {
                chartAccountNBCId: '0062',
                accountDocNBC: {
                    _id: "0062",
                    code: '9.2',
                    name: 'ចំណាយពិសេស',
                    accountTypeNBC: "Balance"
                }
            }
        );
    }
});