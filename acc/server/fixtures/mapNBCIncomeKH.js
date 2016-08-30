import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

import {MapNBCIncomeKH} from '../../imports/api/collections/mapNBCIncomeKH.js';
Meteor.startup(function () {
    if (MapNBCIncomeKH.find().count() == 0) {

        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0001',
                accountDocNBC: {
                    _id: "0001",
                    code: '1.1',
                    name: 'សាច់ប្រាក់ក្នុងដៃ (ជារៀលនិងរូបិយប័ណ្ណបរទេស)',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0002',
                accountDocNBC: {

                    _id: "0002",
                    code: '1.2',
                    name: 'ប្រាក់បញ្ញើនៅធនាគារជាតិ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0003',
                accountDocNBC: {

                    _id: "0003",
                    code: '1.3',
                    name: 'ប្រាក់បញ្ញើនៅធនាគារផ្សេងៗ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0004',
                accountDocNBC: {
                    _id: "0004",
                    code: '1.4',
                    name: 'ប្រាក់បញ្ញើផ្សេងៗ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0005',
                accountDocNBC: {
                    _id: "0005",
                    code: '2.1.1',
                    name: 'ដែលក្នុងនោះសមតុល្យនៅសល់តិចជាងមួយខែ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0006',
                accountDocNBC: {
                    _id: "0006",
                    code: '2.1.2',
                    name: 'ដកធនបម្រុងសម្រាប់ការខាតបង់',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0007',
                accountDocNBC: {
                    _id: "0007",
                    code: '2.2',
                    name: 'សមតុល្យឥណទានសុទ្ធ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0008',
                accountDocNBC: {
                    _id: "0008",
                    code: '2.3',
                    name: 'ការប្រាក់បង្គរដែលត្រូវទទួល',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0009',
                accountDocNBC: {
                    _id: "0009",
                    code: '3.1.1',
                    name: 'ដី (តម្លៃសរុប)',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0010',
                accountDocNBC: {
                    _id: "0010",
                    code: '3.1.2',
                    name: 'ដក រំលស់បង្គរ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0011',
                accountDocNBC: {
                    _id: "0011",
                    code: '3.2.1',
                    name: 'អគារ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0012',
                accountDocNBC: {
                    _id: "0012",
                    code: '3.2.2',
                    name: 'ដក រំលស់បង្គរ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0013',
                accountDocNBC: {
                    _id: "0013",
                    code: '3.3.1',
                    name: 'អចលនទ្រព្យផ្សេងៗ (តម្លៃសរុប)',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0014',
                accountDocNBC: {
                    _id: "0014",
                    code: '3.3.2',
                    name: 'ដក រំលស់បង្គរ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0015',
                accountDocNBC: {
                    _id: "0015",
                    code: '3.4.1',
                    name: 'ទ្រព្យសកម្មអរូបិយ (តម្លៃសរុប)',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0016',
                accountDocNBC: {
                    _id: "0016",
                    code: '3.4.2',
                    name: 'ដក រំលស់បង្គរ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0017',
                accountDocNBC: {
                    _id: "0017",
                    code: '4.1',
                    name: 'ជំពូកសម្រាប់ធ្វើបេឡានិច្ច័យ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0018',
                accountDocNBC: {
                    _id: "0018",
                    code: '4.2',
                    name: 'ទ្រព្យសកម្មផ្សេងៗ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0019',
                accountDocNBC: {
                    _id: "0019",
                    code: '5.1.1',
                    name: 'ដែលក្នុងនោះតិចជាងមួយខែ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0020',
                accountDocNBC: {
                    _id: "0020",
                    code: '5.2.1',
                    name: 'ដែលក្នុងនោះតិចជាងមួយខែ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0021',
                accountDocNBC: {
                    _id: "0021",
                    code: '5.3',
                    name: 'ការប្រាក់បង្គរ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0022',
                accountDocNBC: {
                    _id: "0022",
                    code: '6.1',
                    name: 'សន្សំកាតព្វកិច្ច',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0023',
                accountDocNBC: {
                    _id: "0023",
                    code: '6.2.1',
                    name: 'ចរន្ត',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0024',
                accountDocNBC: {
                    _id: "0024",
                    code: '6.2.2',
                    name: 'សំចៃ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0025',
                accountDocNBC: {
                    _id: "0025",
                    code: '6.2.3',
                    name: 'មានកាលកំណត់',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0026',
                accountDocNBC: {
                    _id: "0026",
                    code: '6.3',
                    name: 'ការប្រាក់បង្គរ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0027',
                accountDocNBC: {
                    _id: "0027",
                    code: '7.1',
                    name: 'គណនីត្រូវសង',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0028',
                accountDocNBC: {
                    _id: "0028",
                    code: '7.2',
                    name: 'បង្គរ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0029',
                accountDocNBC: {
                    _id: "0029",
                    code: '7.3',
                    name: 'ពន្ធត្រូវបង់',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0030',
                accountDocNBC: {
                    _id: "0030",
                    code: '7.4',
                    name: 'ទ្រព្យសកម្មផ្សេងៗ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0031',
                accountDocNBC: {
                    _id: "0031",
                    code: '8.1.1',
                    name: 'ដើមទុនបង់ហើយ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0032',
                accountDocNBC: {
                    _id: "0032",
                    code: '8.1.2',
                    name: 'ដកចេញ : មិនទាន់បានបង់',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0033',
                accountDocNBC: {
                    _id: "0033",
                    code: '8.2',
                    name: 'បំណុលបន្ទាប់បន្សំ (ទទួលស្គាល់ពីធនាគារជាតិ)',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0034',
                accountDocNBC: {
                    _id: "0034",
                    code: '8.3',
                    name: 'ប្រាក់បម្រុងនិងសំវិធានធន',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0035',
                accountDocNBC: {
                    _id: "0035",
                    code: '8.4',
                    name: 'ចំណេញរក្សាទុក / ខាតពីឆ្នាំមុន',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0036',
                accountDocNBC: {
                    _id: "0036",
                    code: '8.5',
                    name: 'ចំណេញខាតក្នុងឆ្នាំ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0037',
                accountDocNBC: {
                    _id: "0037",
                    code: '8.6.1',
                    name: 'អំណោយ',
                    accountTypeNBC: "Income"
                }
            }
        );
        MapNBCIncomeKH.insert(
            {
                chartAccountNBCId: '0038',
                accountDocNBC: {
                    _id: "0038",
                    code: '8.6.2',
                    name: 'មូលនិធិសាធារណៈ',
                    accountTypeNBC: "Income"
                }
            }
        );
    }
});