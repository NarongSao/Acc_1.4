import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

import {ChartAccountNBCKH} from '../../imports/api/collections/chartAccountNBCKH';
Meteor.startup(function () {
    if (ChartAccountNBCKH.find().count() == 0) {

        ChartAccountNBCKH.insert(
            {
                _id: "0001",
                code: '1.1',
                name: 'សាច់ប្រាក់ក្នុងដៃ (ជារៀលនិងរូបិយប័ណ្ណបរទេស)',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {

                _id: "0002",
                code: '1.2',
                name: 'ប្រាក់បញ្ញើនៅធនាគារជាតិ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {

                _id: "0003",
                code: '1.3',
                name: 'ប្រាក់បញ្ញើនៅធនាគារផ្សេងៗ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0004",
                code: '1.4',
                name: 'ប្រាក់បញ្ញើផ្សេងៗ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0005",
                code: '2.1.1',
                name: 'ដែលក្នុងនោះសមតុល្យនៅសល់តិចជាងមួយខែ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0006",
                code: '2.1.2',
                name: 'ដកធនបម្រុងសម្រាប់ការខាតបង់',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0007",
                code: '2.2',
                name: 'សមតុល្យឥណទានសុទ្ធ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0008",
                code: '2.3',
                name: 'ការប្រាក់បង្គរដែលត្រូវទទួល',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0009",
                code: '3.1.1',
                name: 'ដី (តម្លៃសរុប)',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0010",
                code: '3.1.2',
                name: 'ដក រំលស់បង្គរ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0011",
                code: '3.2.1',
                name: 'អគារ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0012",
                code: '3.2.2',
                name: 'ដក រំលស់បង្គរ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0013",
                code: '3.3.1',
                name: 'អចលនទ្រព្យផ្សេងៗ (តម្លៃសរុប)',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0014",
                code: '3.3.2',
                name: 'ដក រំលស់បង្គរ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0015",
                code: '3.4.1',
                name: 'ទ្រព្យសកម្មអរូបិយ (តម្លៃសរុប)',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0016",
                code: '3.4.2',
                name: 'ដក រំលស់បង្គរ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0017",
                code: '4.1',
                name: 'ជំពូកសម្រាប់ធ្វើបេឡានិច្ច័យ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0018",
                code: '4.2',
                name: 'ទ្រព្យសកម្មផ្សេងៗ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0019",
                code: '5.1.1',
                name: 'ដែលក្នុងនោះតិចជាងមួយខែ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0020",
                code: '5.2.1',
                name: 'ដែលក្នុងនោះតិចជាងមួយខែ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0021",
                code: '5.3',
                name: 'ការប្រាក់បង្គរ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0022",
                code: '6.1',
                name: 'សន្សំកាតព្វកិច្ច',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0023",
                code: '6.2.1',
                name: 'ចរន្ត',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0024",
                code: '6.2.2',
                name: 'សំចៃ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0025",
                code: '6.2.3',
                name: 'មានកាលកំណត់',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0026",
                code: '6.3',
                name: 'ការប្រាក់បង្គរ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0027",
                code: '7.1',
                name: 'គណនីត្រូវសង',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0028",
                code: '7.2',
                name: 'បង្គរ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0029",
                code: '7.3',
                name: 'ពន្ធត្រូវបង់',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0030",
                code: '7.4',
                name: 'ទ្រព្យសកម្មផ្សេងៗ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0031",
                code: '8.1.1',
                name: 'ដើមទុនបង់ហើយ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0032",
                code: '8.1.2',
                name: 'ដកចេញ : មិនទាន់បានបង់',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0033",
                code: '8.2',
                name: 'បំណុលបន្ទាប់បន្សំ (ទទួលស្គាល់ពីធនាគារជាតិ)',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0034",
                code: '8.3',
                name: 'ប្រាក់បម្រុងនិងសំវិធានធន',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0035",
                code: '8.4',
                name: 'ចំណេញរក្សាទុក / ខាតពីឆ្នាំមុន',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0036",
                code: '8.5',
                name: 'ចំណេញខាតក្នុងឆ្នាំ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0037",
                code: '8.6.1',
                name: 'អំណោយ',
                accountTypeNBC: "Income"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0038",
                code: '8.6.2',
                name: 'មូលនិធិសាធារណៈ',
                accountTypeNBC: "Income"
            }
        );
		
		
		
		
		
		
		


        ChartAccountNBCKH.insert(
            {
                _id: "0039",
                code: '1.1',
                name: 'ប្រតិបត្តិការជាមួយគ្រឹះស្ថានហិរញ្ញវត្ថុផ្សេងៗ',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0040",
                code: '1.2',
                name: 'ប្រតិបត្តិការជាមួយអតិថិជន',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0041",
                code: '1.3',
                name: 'ចំណូលការប្រាក់ផ្សេងៗ',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0042",
                code: '2.1',
                name: 'ខ្ចីពីគ្រឹះស្ថានហិរញ្ញវត្ថុនានា',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0043",
                code: '2.2',
                name: 'ប្រាក់បញ្ញើអតិថិជន',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0044",
                code: '2.3',
                name: 'ចំណាយការប្រាក់ផ្សេងទៀត',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0045",
                code: '4.1.1',
                name: 'ចំណូលដែលទទួលបាន',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0046",
                code: '4.1.2',
                name: 'ចំណាយដែលកើតឡើង',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0047",
                code: '4.2',
                name: 'ចំណេញ(ខាត)ពីការប្តូរប្រាក់',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0048",
                code: '4.3',
                name: 'ចំណូលមិនមែនការប្រាក់ផ្សេងៗ',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0049",
                code: '6.1',
                name: 'បៀវត្សនិងឧបត្ថម្ភ',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0050",
                code: '6.2',
                name: 'ចំណាយផ្សេងទៀតលើបុគ្គលិក',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0051",
                code: '6.3',
                name: 'ចំណាយជួល',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0052",
                code: '6.4',
                name: 'ចំណាយលើអគារ',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0053",
                code: '6.5',
                name: 'ចំណាយលើទព្វសំភារៈ',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0054",
                code: '6.6',
                name: 'ចំណាយរដ្ឋបាល',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0055",
                code: '6.7',
                name: 'ចំណាយរំលស់',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0056",
                code: '6.8.1',
                name: 'ក្នុងនោះជាមួយធនាគារជាតិ',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0057",
                code: '6.9',
                name: 'ចំណាយផ្សេងទៀតលើប្រតិបត្តិការ',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0058",
                code: '8.1',
                name: 'សំវិធានធនលើឥណទានបាត់បង់',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0059",
                code: '8.2',
                name: 'ទារបានវិញ',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0060",
                code: '8.3',
                name: 'ផ្សេងៗ',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0061",
                code: '9.1.1',
                name: 'ដែលក្នុងនោះជាអំណោយ',
                accountTypeNBC: "Balance"
            }
        );ChartAccountNBCKH.insert(
            {
                _id: "0062",
                code: '9.2',
                name: 'ចំណាយពិសេស',
                accountTypeNBC: "Balance"
            }
        );
    }
});
