import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

import {ChartAccount} from '../../imports/api/collections/chartAccount';
Meteor.startup(function () {
    if (ChartAccount.find().count() == 0) {


     //  NWDA

        ChartAccount.insert(
            {
                _id: "002",
                code: '111102',
                name: 'Cash on Hand',
                accountTypeId: "10"
            }
        );
        ChartAccount.insert(
            {
                _id: "003",
                code: '116302',
                name: 'Demand and Saving bank',
                accountTypeId: "10"
            }
        );
        ChartAccount.insert(
            {
                _id: "004",
                code: '116302A',
                name: 'Saving ACLEDA bank',
                accountTypeId: "10",
                parentId: "003",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "005",
                code: '116302B',
                name: 'Saving CANADAI bank',
                accountTypeId: "10",
                parentId: "003",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "006",
                code: '116302C',
                name: 'Saving COMPUC bank',
                accountTypeId: "10",
                parentId: "003",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "007",
                code: '116302D',
                name: 'Saving RDB bank',
                accountTypeId: "10",
                parentId: "003",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "008",
                code: '131202',
                name: 'Standard Loans Individual',
                accountTypeId: "10"
            }
        );
        ChartAccount.insert(
            {
                _id: "009",
                code: '171202',
                name: 'Less Reserve for General',
                accountTypeId: "10"
            }
        );
        ChartAccount.insert(
            {
                _id: "010",
                code: '221502',
                name: 'Prepaid Rent',
                accountTypeId: "10"
            }
        );
        ChartAccount.insert(
            {
                _id: "011",
                code: '221652',
                name: 'Prepaid Other',
                accountTypeId: "10"
            }
        );
        ChartAccount.insert(
            {
                _id: "012",
                code: '296502',
                name: 'Advance For staff',
                accountTypeId: "10"
            }
        );

        ChartAccount.insert(
            {
                _id: "014",
                code: '291102 ',
                name: 'Land',
                accountTypeId: "11"
            }
        );
        ChartAccount.insert(
            {
                _id: "015",
                code: '293102',
                name: 'Furniture and fixture',
                accountTypeId: "11"
            }
        );
        ChartAccount.insert(
            {
                _id: "016",
                code: '293302',
                name: 'Computer and Equipment',
                accountTypeId: "11"
            }
        );
        ChartAccount.insert(
            {
                _id: "017",
                code: '293402',
                name: 'Motors and Vehicles',
                accountTypeId: "11"
            }
        );
        ChartAccount.insert(
            {
                _id: "018",
                code: '293502',
                name: 'Software',
                accountTypeId: "11"
            }
        );
        ChartAccount.insert(
            {
                _id: "019",
                code: '294402',
                name: 'Accu-Depre-Funiture',
                accountTypeId: "11"
            }
        );
        ChartAccount.insert(
            {
                _id: "020",
                code: '294602 ',
                name: 'Acc-dep-Computer &Equip',
                accountTypeId: "11"
            }
        );
        ChartAccount.insert(
            {
                _id: "021",
                code: '294702',
                name: 'Accu-Depr-Motor&Vehicle',
                accountTypeId: "11"
            }
        );
        ChartAccount.insert(
            {
                _id: "022",
                code: '294802',
                name: 'Acc-Depr-software',
                accountTypeId: "11"
            }
        );
        ChartAccount.insert(
            {
                _id: "023",
                code: '296602',
                name: 'Equivalence Exchange Acc',
                accountTypeId: "12"
            }
        );
        ChartAccount.insert(
            {
                _id: "024",
                code: '322902',
                name: 'Compulsory Deposits',
                accountTypeId: "20"
            }
        );
        ChartAccount.insert(
            {
                _id: "025",
                code: '332202',
                name: 'Subordinated Debt',
                accountTypeId: "20"
            }
        );
        ChartAccount.insert(
            {
                _id: "026",
                code: '361202',
                name: 'Accrued Bonus payable',
                accountTypeId: "20"
            }
        );
        ChartAccount.insert(
            {
                _id: "027",
                code: '361203',
                name: 'Accrued tax on Salary',
                accountTypeId: "20"
            }
        );
        ChartAccount.insert(
            {
                _id: "028",
                code: '371203',
                name: 'Staff Retire Deposit',
                accountTypeId: "20"
            }
        );
        ChartAccount.insert(
            {
                _id: "029",
                code: '381102',
                name: 'Account payable',
                accountTypeId: "20"
            }
        );

        ChartAccount.insert(
            {
                _id: "031",
                code: '334302',
                name: 'long term Borrowing bank',
                accountTypeId: "21"
            }
        );
        ChartAccount.insert(
            {
                _id: "032",
                code: '345302',
                name: 'AIP-long-term-bank',
                accountTypeId: "21"
            }
        );
        ChartAccount.insert(
            {
                _id: "033",
                code: '3000',
                name: 'Opening Bal Equity',
                accountTypeId: "30"
            }
        );

        ChartAccount.insert(
            {
                _id: "035",
                code: '401102',
                name: 'Paid Up Capital',
                accountTypeId: "30"
            }
        );
        ChartAccount.insert(
            {
                _id: "036",
                code: '402202',
                name: 'Donated Capital previous',
                accountTypeId: "30"
            }
        );
        ChartAccount.insert(
            {
                _id: "037",
                code: '404302',
                name: 'Perpeted subordinated d',
                accountTypeId: "30"
            }
        );
        ChartAccount.insert(
            {
                _id: "038",
                code: '405202',
                name: 'Capital',
                accountTypeId: "30"
            }
        );
        ChartAccount.insert(
            {
                _id: "039",
                code: '407102',
                name: 'Retained Earning',
                accountTypeId: "30"
            }
        );
        ChartAccount.insert(
            {
                _id: "040",
                code: '408102',
                name: 'Profit Current year',
                accountTypeId: "30"
            }
        );
        ChartAccount.insert(
            {
                _id: "041",
                code: '515302',
                name: 'Interest income (bank)',
                accountTypeId: "40"
            }
        );
        ChartAccount.insert(
            {
                _id: "042",
                code: '521202',
                name: 'Interest income (client)',
                accountTypeId: "40"
            }
        );
        ChartAccount.insert(
            {
                _id: "043",
                code: '564102',
                name: 'Other interest Income',
                accountTypeId: "40"
            }
        );
        ChartAccount.insert(
            {
                _id: "044",
                code: '571102',
                name: 'Fees &Commission Loan',
                accountTypeId: "40"
            }
        );
        ChartAccount.insert(
            {
                _id: "045",
                code: '571202',
                name: 'Other Fees(Penalty)',
                accountTypeId: "40"
            }
        );
        ChartAccount.insert(
            {
                _id: "046",
                code: '573102',
                name: 'Other Non-Inter income',
                accountTypeId: "40"
            }
        );
        ChartAccount.insert(
            {
                _id: "047",
                code: '574102',
                name: 'Foreign Exchange Gain',
                accountTypeId: "40"
            }
        );
        ChartAccount.insert(
            {
                _id: "048",
                code: '575102',
                name: 'Gain on deposal fixasset',
                accountTypeId: "40"
            }
        );
        ChartAccount.insert(
            {
                _id: "049",
                code: '612902',
                name: 'Inter-Exp-Com. Deposit',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "050",
                code: '622302',
                name: 'Inter-Exp.Subordinated',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "051",
                code: '624302',
                name: 'Inter-Exp-Long-loan bank',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "052",
                code: '629902',
                name: 'Interest expense Other',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "053",
                code: '631102',
                name: 'Salary & Bonuse Expense',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "054",
                code: '631102A',
                name: 'Salary of BOD',
                accountTypeId: "50",
                parentId: "053",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "055",
                code: '631102B',
                name: 'Salary of Technical',
                accountTypeId: "50",
                parentId: "053",
                level: "1"

            }
        );
        ChartAccount.insert(
            {
                _id: "056",
                code: '631102C',
                name: 'Salary of Staff',
                accountTypeId: "50",
                parentId: "053",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "057",
                code: '631102D',
                name: 'Bonuse expense',
                accountTypeId: "50",
                parentId: "053",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "058",
                code: '631103',
                name: 'Staff Retire Expense',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "059",
                code: '631202',
                name: 'Employee overtime exp',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "060",
                code: '631302',
                name: 'Employee Tranining Exp',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "061",
                code: '631402',
                name: 'Employee Medical Exp',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "062",
                code: '631802',
                name: 'Employee Pension Exp',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "063",
                code: '631902',
                name: 'Other Employee Exp',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "064",
                code: '631902A',
                name: 'Newspaper, Pure drink',
                accountTypeId: "50",
                parentId: "063",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "065",
                code: '631902B',
                name: 'Mission,Guest',
                accountTypeId: "50",
                parentId: "063",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "066",
                code: '631902C',
                name: 'Support Food',
                accountTypeId: "50",
                parentId: "063",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "067",
                code: '642202',
                name: 'Depr Expense Building',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "068",
                code: '642352',
                name: 'Depre-Exp-Furniture&Fix',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "069",
                code: '642502',
                name: 'Depre-Exp-Motor&Vihicle',
                accountTypeId: "50"
            });
        ChartAccount.insert(
            {
                _id: "070",
                code: '642532',
                name: 'Depre-Softwear',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "071",
                code: '653102',
                name: 'Repair and Maintain Exp',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "072",
                code: '653102A',
                name: 'Repair&Maintain car',
                accountTypeId: "50",
                parentId: "071",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "073",
                code: '653102B',
                name: 'Repair&Maintain Motor',
                accountTypeId: "50",
                parentId: "071",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "074",
                code: '653102C',
                name: 'Repair&Maintain Office',
                accountTypeId: "50",
                parentId: "071",
                level: "1"
            }
        ); ChartAccount.insert(
            {
                _id: "105",
                code: '653102D',
                name: 'Repair&Maintain Software',
                accountTypeId: "50",
                parentId: "071",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "075",
                code: '653202',
                name: 'Rental Expense',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "076",
                code: '653302',
                name: 'Utility Expense',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "077",
                code: '653402',
                name: 'Sm Items of Fur.Fix&Equ',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "078",
                code: '654102',
                name: 'Marketing and adv Exp.',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "079",
                code: '654202',
                name: 'Professional Service exp',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "080",
                code: '654302',
                name: 'Tax fees Expense',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "081",
                code: '654302A',
                name: 'Tax on Salary',
                accountTypeId: "50",
                parentId: "080",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "082",
                code: '654302B',
                name: 'Tax on Label',
                accountTypeId: "50",
                parentId: "080",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "083",
                code: '654302C',
                name: 'Tax For Car',
                accountTypeId: "50",
                parentId: "080",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "084",
                code: '654302D',
                name: 'Tax For Motor',
                accountTypeId: "50",
                parentId: "080",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "085",
                code: '654502',
                name: 'Legal fees expense',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "086",
                code: '655102',
                name: 'Tavel expense',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "087",
                code: '655202',
                name: 'Business Meal&Enter Exp',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "088",
                code: '655302',
                name: 'Communication Expense',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "089",
                code: '655302A',
                name: 'cellcard & Telephone',
                accountTypeId: "50",
                parentId: "088",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "090",
                code: '655302B',
                name: 'Send Document',
                accountTypeId: "50",
                parentId: "088",
                level: "1"
            }
        );
        ChartAccount.insert(
            {
                _id: "091",
                code: '657102',
                name: 'Stationery & Supply Exp',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "092",
                code: '657202',
                name: 'Printing and Forms Exp',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "093",
                code: '658902',
                name: 'Other Insurance Expense',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "094",
                code: '661102',
                name: 'Security Expense',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "095",
                code: '662102 ',
                name: 'Boad of Directors fee',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "096",
                code: '662202',
                name: 'Shareholders Meeting Exp',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "097",
                code: '668102',
                name: 'Gasholine operating Exp',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "098",
                code: '669902',
                name: 'Miscellaneous Exp.',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "099",
                code: '671102',
                name: 'Bad & Doubtful Debts',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "100",
                code: '681102',
                name: 'Loss on Foreign Exchang',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "101",
                code: '681602',
                name: 'Loss on Sale/Disposal As',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "102",
                code: '692102',
                name: 'Coresponden Bank Charge',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "103",
                code: '692202',
                name: 'Fees&Commiss on Borrow',
                accountTypeId: "50"
            }
        );
        ChartAccount.insert(
            {
                _id: "104",
                code: '654402',
                name: 'License Fees Expense',
                accountTypeId: "51"
            }
        );

        //CFO

        /*//Riel
        ChartAccount.insert({_id:	"001"	,code:	"100002"	,name:	"Total Assets Control Account",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"002"	,code:	"111102"	,name:	"Cash in Vault and on Hand ",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"003"	,code:	"111202"	,name:	"Cash in Transit ",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"004"	,code:	"111302"	,name:	"Cheques in Transit",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"005"	,code:	"114102"	,name:	"Due from NBC",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"006"	,code:	"114202"	,name:	"Capital Guarantee Deposit with NBC",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"007"	,code:	"114302"	,name:	"Reserve Requirement with NBC",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"008"	,code:	"114402"	,name:	"Other Demand Deposit with NBC",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"009"	,code:	"114602"	,name:	"Other Term Deposit with NBC",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"010"	,code:	"115102"	,name:	"Current Accounts (Nostro) with Banks rated AAA to AA-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"011"	,code:	"115202"	,name:	"Current Accounts (Nostro) with Banks rated A+ to A-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"012"	,code:	"115302"	,name:	"Current Accounts (Nostro) with Banks rated below A-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"013"	,code:	"116102"	,name:	"Demand and Savings Deposits with Banks rated AAA to AA-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"014"	,code:	"116202"	,name:	"Demand and Savings Deposits with Banks rated A+ to A-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"015"	,code:	"116302"	,name:	"Demand and Savings Deposits with Banks rated below A-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"016"	,code:	"121102"	,name:	"Time Deposits and Placements with Banks rated AAA to AA-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"017"	,code:	"121202"	,name:	"Time Deposits and Placements with Banks rated A+ to A-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"018"	,code:	"121302"	,name:	"Time Deposits and Placements with Banks rated below A-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"019"	,code:	"122102"	,name:	"Claims on Sovereigns rated AAA to AA-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"020"	,code:	"122202"	,name:	"Claims on Sovereigns rated A+ to A-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"021"	,code:	"122302"	,name:	"Claims on Sovereigns rated BBB+ to BBB-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"022"	,code:	"122402"	,name:	"Claims on Sovereigns rated below BBB-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"023"	,code:	"131102"	,name:	"Standard Loans – Groups <=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"024"	,code:	"131202"	,name:	"Standard Loans – Individuals<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"025"	,code:	"131302"	,name:	"Standard Loans – Enterprises<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"026"	,code:	"131402"	,name:	"Standard Loans – Others<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"027"	,code:	"131512"	,name:	"Standard Loans – Related Party<=1 year - Shareholders",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"028"	,code:	"131522"	,name:	"Standard Loans – Related Party<=1 year - Managers",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"029"	,code:	"131532"	,name:	"Standard Loans – Related Party<=1 year - Employees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"030"	,code:	"131542"	,name:	"Standard Loans – Related Party<=1 year - External Auditors",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"031"	,code:	"132102"	,name:	"Standard Loans – Groups>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"032"	,code:	"132202"	,name:	"Standard Loans – Individuals>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"033"	,code:	"132302"	,name:	"Standard Loans – Enterprises>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"034"	,code:	"132402"	,name:	"Standard Loans – Others> 1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"035"	,code:	"132512"	,name:	"Standard Loans – Related Party>1 year - Shareholders",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"036"	,code:	"132522"	,name:	"Standard Loans – Related Party>1 year - Managers",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"037"	,code:	"132532"	,name:	"Standard Loans – Related Party>1 year - Employees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"038"	,code:	"132542"	,name:	"Standard Loans – Related Party>1 year - External Auditors",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"039"	,code:	"141102"	,name:	"Substandard Loans - Groups<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"040"	,code:	"141202"	,name:	"Substandard Loans - Individuals<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"041"	,code:	"141302"	,name:	"Substandard Loans - Enterprises<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"042"	,code:	"141402"	,name:	"Substandard Loans - Others<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"043"	,code:	"141512"	,name:	"Substandard Loans - Related Party<=1 year - Shareholders",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"044"	,code:	"141522"	,name:	"Substandard Loans - Related Party<=1 year - Managers",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"045"	,code:	"141532"	,name:	"Substandard Loans - Related Party<=1 year - Employees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"046"	,code:	"141542"	,name:	"Substandard Loans - Related Party<=1 year - External Auditors",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"047"	,code:	"142102"	,name:	"Substandard Loans - Groups>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"048"	,code:	"142202"	,name:	"Substandard Loans - Individuals>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"049"	,code:	"142302"	,name:	"Substandard Loans - Enterprises>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"050"	,code:	"142402"	,name:	"Substandard Loans - Others>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"051"	,code:	"142512"	,name:	"Substandard Loans - Related Party>1 year - Shareholders",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"052"	,code:	"142522"	,name:	"Substandard Loans - Related Party>1 year - Managers",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"053"	,code:	"142532"	,name:	"Substandard Loans - Related Party>1 year - Employees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"054"	,code:	"142542"	,name:	"Substandard Loans - Related Party>1 year - External Auditors",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"055"	,code:	"151102"	,name:	"Doubtful Loans - Groups<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"056"	,code:	"151202"	,name:	"Doubtful Loans - Individuals<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"057"	,code:	"151302"	,name:	"Doubtful Loans - Enterprises<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"058"	,code:	"151402"	,name:	"Doubtful Loans - Others<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"059"	,code:	"151512"	,name:	"Doubtful Loans - Related Party<=1 year - Shareholders",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"060"	,code:	"151522"	,name:	"Doubtful Loans - Related Party<=1 year - Managers",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"061"	,code:	"151532"	,name:	"Doubtful Loans - Related Party<=1 year - Employees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"062"	,code:	"151542"	,name:	"Doubtful Loans - Related Party<=1 year - External Auditors",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"063"	,code:	"152102"	,name:	"Doubtful Loans - Groups>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"064"	,code:	"152202"	,name:	"Doubtful Loans - Individuals>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"065"	,code:	"152302"	,name:	"Doubtful Loans - Enterprises>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"066"	,code:	"152402"	,name:	"Doubtful Loans - Others>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"067"	,code:	"152512"	,name:	"Doubtful Loans - Related Party>1 year - Shareholders",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"068"	,code:	"152522"	,name:	"Doubtful Loans - Related Party>1 year - Managers",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"069"	,code:	"152532"	,name:	"Doubtful Loans - Related Party>1 year - Employees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"070"	,code:	"152542"	,name:	"Doubtful Loans - Related Party>1 year - External Auditors",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"071"	,code:	"161102"	,name:	"Loss Loans - Groups<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"072"	,code:	"161202"	,name:	"Loss Loans - Individuals<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"073"	,code:	"161302"	,name:	"Loss Loans - Enterprises<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"074"	,code:	"161402"	,name:	"Loss Loans - Others<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"075"	,code:	"161512"	,name:	"Loss Loans - Related Party<=1 year - Shareholders",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"076"	,code:	"161522"	,name:	"Loss Loans - Related Party<=1 year - Managers",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"077"	,code:	"161532"	,name:	"Loss Loans - Related Party<=1 year - Employees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"078"	,code:	"161542"	,name:	"Loss Loans - Related Party<=1 year - External Auditors",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"079"	,code:	"162102"	,name:	"Loss Loans - Groups>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"080"	,code:	"162202"	,name:	"Loss Loans - Individuals>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"081"	,code:	"162302"	,name:	"Loss Loans - Enterprises>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"082"	,code:	"162402"	,name:	"Loss Loans - Others>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"083"	,code:	"162512"	,name:	"Loss Loans - Related Party>1 year - Shareholders",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"084"	,code:	"162522"	,name:	"Loss Loans - Related Party>1 year - Managers",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"085"	,code:	"162532"	,name:	"Loss Loans - Related Party>1 year - Employees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"086"	,code:	"162542"	,name:	"Loss Loans - Related Party>1 year - External Auditors",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"087"	,code:	"171102"	,name:	"( Less) Reserve for Specific Loan Losses",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"088"	,code:	"171202"	,name:	"( Less) Reserve for General Loan Losses",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"089"	,code:	"211002"	,name:	"Investment Debt Securities - Hold to Maturity",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"090"	,code:	"211602"	,name:	"Accumulated Premium (Discount) – HTM",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"091"	,code:	"212002"	,name:	"Investment Debt Securities - Available for Sale",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"092"	,code:	"212602"	,name:	"Accumulated Premium (Discount) – AFS",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"093"	,code:	"213802"	,name:	"Other Investment Securities",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"094"	,code:	"214902"	,name:	"Investment in Equity Capital",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"095"	,code:	"215602"	,name:	"Net Unrealized Holding Gains (Loss) – AFS ",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"096"	,code:	"221102"	,name:	"Prepaid Insurance",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"097"	,code:	"221202"	,name:	"Prepaid Deposit Insurance Assessment",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"098"	,code:	"221302"	,name:	"Prepaid Service / Maintenance Contracts",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"099"	,code:	"221402"	,name:	"Prepaid Professional Fees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"100"	,code:	"221502"	,name:	"Prepaid Rent",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"101"	,code:	"221602"	,name:	"Prepaid Profit Tax",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"102"	,code:	"221652"	,name:	"Prepaid - Other",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"103"	,code:	"222302"	,name:	"Advance Payment or Deposits",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"104"	,code:	"222402"	,name:	"Purchased Interest Receivable",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"105"	,code:	"222502"	,name:	"Stationary Supply and Inventory",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"106"	,code:	"231102"	,name:	"AIR – Due from NBC",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"107"	,code:	"231202"	,name:	"AIR – Capital Guarantee Deposit  with NBC",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"108"	,code:	"231302"	,name:	"AIR – Other Demand Deposit with NBC",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"109"	,code:	"231602"	,name:	"AIR – Other Term Deposit with NBC",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"110"	,code:	"232102"	,name:	"AIR - Demand and Savings Deposits with Banks rated AAA to AA-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"111"	,code:	"232202"	,name:	"AIR - Demand and Savings Deposits with Banks rated A+ to A-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"112"	,code:	"232302"	,name:	"AIR - Demand and Savings Deposits with Banks rated below A-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"113"	,code:	"233102"	,name:	"AIR - Time Deposits and Placements with Banks rated AAA to AA-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"114"	,code:	"233202"	,name:	"AIR - Time Deposits and Placements with Banks rated A+ to A-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"115"	,code:	"233302"	,name:	"AIR - Time Deposits and Placements with Banks rated below A-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"116"	,code:	"234102"	,name:	"AIR - Claims on Sovereigns rated AAA to AA-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"117"	,code:	"234202"	,name:	"AIR - Claims on Sovereigns rated A+ to A-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"118"	,code:	"234302"	,name:	"AIR - Claims on Sovereigns rated BBB+ to BBB-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"119"	,code:	"234402"	,name:	"AIR - Claims on Sovereigns rated below BBB-",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"120"	,code:	"241002"	,name:	"AIR – Investment Debt Securities – Hold to Maturity ",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"121"	,code:	"242002"	,name:	"AIR – Investment Debt Securities – Available For Sale",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"122"	,code:	"243002"	,name:	"AIR – Other Investment ",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"123"	,code:	"251102"	,name:	"AIR - Standard Loans – Groups <=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"124"	,code:	"251202"	,name:	"AIR - Standard Loans – Individuals<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"125"	,code:	"251302"	,name:	"AIR - Standard Loans – Enterprises<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"126"	,code:	"251402"	,name:	"AIR - Standard Loans – Others<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"127"	,code:	"251512"	,name:	"AIR - Standard Loans – Related Party<=1 year - Shareholders",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"128"	,code:	"251522"	,name:	"AIR - Standard Loans – Related Party<=1 year - Managers",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"129"	,code:	"251532"	,name:	"AIR - Standard Loans – Related Party<=1 year - Employees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"130"	,code:	"251542"	,name:	"AIR - Standard Loans – Related Party<=1 year - External Auditors",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"131"	,code:	"252102"	,name:	"AIR - Standard Loans – Groups>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"132"	,code:	"252202"	,name:	"AIR - Standard Loans – Individuals>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"133"	,code:	"252302"	,name:	"AIR - Standard Loans – Enterprises>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"134"	,code:	"252402"	,name:	"AIR - Standard Loans – Others> 1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"135"	,code:	"252512"	,name:	"AIR - Standard Loans – Related Party>1 year - Shareholders",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"136"	,code:	"252522"	,name:	"AIR - Standard Loans – Related Party>1 year - Managers",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"137"	,code:	"252532"	,name:	"AIR - Standard Loans – Related Party>1 year - Employees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"138"	,code:	"252542"	,name:	"AIR - Standard Loans – Related Party>1 year - External Auditors",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"139"	,code:	"261102"	,name:	"AIR - Substandard Loans - Groups<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"140"	,code:	"261202"	,name:	"AIR - Substandard Loans - Individuals<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"141"	,code:	"261302"	,name:	"AIR - Substandard Loans - Enterprises<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"142"	,code:	"261402"	,name:	"AIR - Substandard Loans - Others<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"143"	,code:	"261512"	,name:	"AIR - Substandard Loans - Related Party<=1 year - Shareholders",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"144"	,code:	"261522"	,name:	"AIR - Substandard Loans - Related Party<=1 year - Managers",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"145"	,code:	"261532"	,name:	"AIR - Substandard Loans - Related Party<=1 year - Employees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"146"	,code:	"261542"	,name:	"AIR - Substandard Loans - Related Party<=1 year - External Auditors",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"147"	,code:	"262102"	,name:	"AIR - Substandard Loans - Groups>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"148"	,code:	"262202"	,name:	"AIR - Substandard Loans - Individuals>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"149"	,code:	"262302"	,name:	"AIR - Substandard Loans - Enterprises>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"150"	,code:	"262402"	,name:	"AIR - Substandard Loans - Others>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"151"	,code:	"262512"	,name:	"AIR - Substandard Loans - Related Party>1 year - Shareholders",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"152"	,code:	"262522"	,name:	"AIR - Substandard Loans - Related Party>1 year - Managers",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"153"	,code:	"262532"	,name:	"AIR - Substandard Loans - Related Party>1 year - Employees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"154"	,code:	"262542"	,name:	"AIR - Substandard Loans - Related Party>1 year - External Auditors",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"155"	,code:	"271102"	,name:	"AIR - Doubtful Loans - Groups<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"156"	,code:	"271202"	,name:	"AIR - Doubtful Loans - Individuals<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"157"	,code:	"271302"	,name:	"AIR - Doubtful Loans - Enterprises<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"158"	,code:	"271402"	,name:	"AIR - Doubtful Loans - Others<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"159"	,code:	"271512"	,name:	"AIR - Doubtful Loans - Related Party<=1 year - Shareholders",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"160"	,code:	"271522"	,name:	"AIR - Doubtful Loans - Related Party<=1 year - Managers",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"161"	,code:	"271532"	,name:	"AIR - Doubtful Loans - Related Party<=1 year - Employees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"162"	,code:	"271542"	,name:	"AIR - Doubtful Loans - Related Party<=1 year - External Auditors",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"163"	,code:	"272102"	,name:	"AIR - Doubtful Loans - Groups>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"164"	,code:	"272202"	,name:	"AIR - Doubtful Loans - Individuals>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"165"	,code:	"272302"	,name:	"AIR - Doubtful Loans - Enterprises>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"166"	,code:	"272402"	,name:	"AIR - Doubtful Loans - Others>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"167"	,code:	"272512"	,name:	"AIR - Doubtful Loans - Related Party>1 year - Shareholders",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"168"	,code:	"272522"	,name:	"AIR - Doubtful Loans - Related Party>1 year - Managers",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"169"	,code:	"272532"	,name:	"AIR - Doubtful Loans - Related Party>1 year - Employees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"170"	,code:	"272542"	,name:	"AIR - Doubtful Loans - Related Party>1 year - External Auditors",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"171"	,code:	"281102"	,name:	"AIR - Loss Loans - Groups<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"172"	,code:	"281202"	,name:	"AIR - Loss Loans - Individuals<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"173"	,code:	"281302"	,name:	"AIR - Loss Loans - Enterprises<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"174"	,code:	"281402"	,name:	"AIR - Loss Loans - Others<=1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"175"	,code:	"281512"	,name:	"AIR - Loss Loans - Related Party<=1 year - Shareholders",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"176"	,code:	"281522"	,name:	"AIR - Loss Loans - Related Party<=1 year - Managers",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"177"	,code:	"281532"	,name:	"AIR - Loss Loans - Related Party<=1 year - Employees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"178"	,code:	"281542"	,name:	"AIR - Loss Loans - Related Party<=1 year - External Auditors",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"179"	,code:	"282102"	,name:	"AIR - Loss Loans - Groups>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"180"	,code:	"282202"	,name:	"AIR - Loss Loans - Individuals>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"181"	,code:	"282302"	,name:	"AIR - Loss Loans - Enterprises>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"182"	,code:	"282402"	,name:	"AIR - Loss Loans - Others>1 year",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"183"	,code:	"282512"	,name:	"AIR - Loss Loans - Related Party>1 year - Shareholders",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"184"	,code:	"282522"	,name:	"AIR - Loss Loans - Related Party>1 year - Managers",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"185"	,code:	"282532"	,name:	"AIR - Loss Loans - Related Party>1 year - Employees",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"186"	,code:	"282542"	,name:	"AIR - Loss Loans - Related Party>1 year - External Auditors",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"187"	,code:	"289702"	,name:	"Accounts Receivable ",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"188"	,code:	"289802"	,name:	"Income Tax Receivable/Recoverable",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"189"	,code:	"289902"	,name:	"Dividends Receivable",accountTypeId:	"10"	})
        ChartAccount.insert({_id:	"190"	,code:	"291102"	,name:	"Land ",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"191"	,code:	"291202"	,name:	"Land Improvement",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"192"	,code:	"292102"	,name:	"Building ",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"193"	,code:	"292202"	,name:	"Leasehold Improvement",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"194"	,code:	"292302"	,name:	"Fixed Assets Under Construction/Development",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"195"	,code:	"293102"	,name:	"Furniture and Fixtures",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"196"	,code:	"293202"	,name:	"Equipment",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"197"	,code:	"293302"	,name:	"Computer Equipment",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"198"	,code:	"293402"	,name:	"Motor Vehicles",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"199"	,code:	"293502"	,name:	"Other Fixed Assets",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"200"	,code:	"294102"	,name:	"Accumulated Depreciation – Land Improvements",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"201"	,code:	"294202"	,name:	"Accumulated Depreciation – Buildings ",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"202"	,code:	"294302"	,name:	"Accumulated Depreciation – Leasehold Improvements ",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"203"	,code:	"294402"	,name:	"Accumulated Depreciation – Furniture and Fixtures ",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"204"	,code:	"294502"	,name:	"Accumulated Depreciation – Equipment ",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"205"	,code:	"294602"	,name:	"Accumulated Depreciation – Computer Equipment ",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"206"	,code:	"294702"	,name:	"Accumulated Depreciation – Motor Vehicles ",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"207"	,code:	"294802"	,name:	"Accumulated Depreciation – Other Fixed Assets ",accountTypeId:	"11"	})
        ChartAccount.insert({_id:	"208"	,code:	"294912"	,name:	"Amortization – Intangible Assets ",accountTypeId:	"12"	})
        ChartAccount.insert({_id:	"209"	,code:	"294922"	,name:	"Amortization – Formation Expenses",accountTypeId:	"12"	})
        ChartAccount.insert({_id:	"210"	,code:	"295102"	,name:	"Formation Expenses",accountTypeId:	"12"	})
        ChartAccount.insert({_id:	"211"	,code:	"295202"	,name:	"Intangible Assets",accountTypeId:	"12"	})
        ChartAccount.insert({_id:	"212"	,code:	"296502"	,name:	"Inter-Branch Accounts",accountTypeId:	"12"	})
        ChartAccount.insert({_id:	"213"	,code:	"296602"	,name:	"Equivalence Foreign Exchange Position Account ",accountTypeId:	"12"	})
        ChartAccount.insert({_id:	"214"	,code:	"296702"	,name:	"Suspense Asset Account ",accountTypeId:	"12"	})
        ChartAccount.insert({_id:	"215"	,code:	"296802"	,name:	"Other Sundry Assets ",accountTypeId:	"12"	})
        ChartAccount.insert({_id:	"216"	,code:	"300002"	,name:	"Total Liabilities Control Account",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"217"	,code:	"321102"	,name:	"Amounts owed to NBC",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"218"	,code:	"322102"	,name:	"Voluntary Deposits - Demand",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"219"	,code:	"322202"	,name:	"Voluntary Deposits - Savings",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"220"	,code:	"322302"	,name:	"Voluntary Deposits - Term",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"221"	,code:	"322402"	,name:	"Voluntary Deposits - Other",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"222"	,code:	"322902"	,name:	"Compulsory Deposits",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"223"	,code:	"332202"	,name:	"Subordinated Debt",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"224"	,code:	"333102"	,name:	"Short-term Borrowed Funds – Shareholders ",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"225"	,code:	"333202"	,name:	"Short-term Borrowed Funds – Corporations, Associations, Organizations",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"226"	,code:	"333302"	,name:	"Short-term Borrowed Funds -  Banks",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"227"	,code:	"333402"	,name:	"Short-term Borrowed Funds - Other",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"228"	,code:	"334102"	,name:	"Long-term Borrowed Funds – Shareholders ",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"229"	,code:	"334202"	,name:	"Long-term Borrowed Funds – Corporations, Associations, Organizations",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"230"	,code:	"334302"	,name:	"Long-term Borrowed Funds -  Banks",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"231"	,code:	"334402"	,name:	"Long-term Borrowed Funds - Other",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"232"	,code:	"341102"	,name:	"AIP - Amounts owed to NBC",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"233"	,code:	"342102"	,name:	"AIP - Voluntary Deposits - Demand",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"234"	,code:	"342202"	,name:	"AIP - Voluntary Deposits - Savings",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"235"	,code:	"342302"	,name:	"AIP - Voluntary Deposits - Term",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"236"	,code:	"342402"	,name:	"AIP - Voluntary Deposits - Other",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"237"	,code:	"342902"	,name:	"AIP - Compulsory Deposits",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"238"	,code:	"343302"	,name:	"AIP – Subordinated Debt",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"239"	,code:	"344102"	,name:	"AIP – Short-term Borrowed Funds – Shareholders ",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"240"	,code:	"344202"	,name:	"AIP – Short-term Borrowed Funds – Corporations, Associations, Organizations  ",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"241"	,code:	"344302"	,name:	"AIP – Short-term Borrowed Funds – Banks",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"242"	,code:	"344402"	,name:	"AIP – Short-term Borrowed Funds – Other",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"243"	,code:	"345102"	,name:	"AIP – Long-term Borrowed Funds – Shareholders ",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"244"	,code:	"345202"	,name:	"AIP – Long-term Borrowed Funds – Corporations, Associations, Organizations  ",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"245"	,code:	"345302"	,name:	"AIP – Long-term Borrowed Funds – Banks",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"246"	,code:	"345402"	,name:	"AIP – Long-term Borrowed Funds – Other",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"247"	,code:	"361102"	,name:	"Accrued Salary Payable",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"248"	,code:	"361202"	,name:	"Accrued Bonus/Incentive Compensation Payable",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"249"	,code:	"361302"	,name:	"Accrued and Withheld Payroll Taxes Payable",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"250"	,code:	"361402"	,name:	"Other Payroll Deductions Withheld Payable",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"251"	,code:	"361502"	,name:	"Accrued Employee Benefits Payable",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"252"	,code:	"361602"	,name:	"Accrued Vacation Pay Payable  ",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"253"	,code:	"362102"	,name:	"Accrued Expenses and Provisions",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"254"	,code:	"363102"	,name:	"Accrued Taxes Payable",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"255"	,code:	"372102"	,name:	"Unearned Income",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"256"	,code:	"373102"	,name:	"Deferred Income – Government and Public Grants",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"257"	,code:	"381102"	,name:	"Accounts Payable",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"258"	,code:	"382102"	,name:	"Dividend Payable",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"259"	,code:	"383102"	,name:	"Dividend Withholding Taxes",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"260"	,code:	"384102"	,name:	"Other Withholding Taxes",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"261"	,code:	"385102"	,name:	"Interest in Suspense",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"262"	,code:	"386102"	,name:	"Foreign Exchange Position Account  ",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"263"	,code:	"389102"	,name:	"Provision for Losses on Off Balance Sheet Accounts",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"264"	,code:	"389202"	,name:	"Global and General Provision for Losses ",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"265"	,code:	"389302"	,name:	"Deferred Taxation",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"266"	,code:	"389802"	,name:	"Suspense and Sundry Liability Account",accountTypeId:	"20"	})
        ChartAccount.insert({_id:	"267"	,code:	"400002"	,name:	"Total Equity Control Account",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"268"	,code:	"401102"	,name:	"Paid Up Capital",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"269"	,code:	"401202"	,name:	"Premiums Related to Capital (Paid in Surplus)",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"270"	,code:	"401302"	,name:	"( Less) Unpaid Portion of Capital",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"271"	,code:	"401402"	,name:	"( Less) Treasury Stock",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"272"	,code:	"402102"	,name:	"Donated capital - Current year",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"273"	,code:	"402202"	,name:	"Donated capital - Previous years",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"274"	,code:	"404102"	,name:	"Hybrid Capital - Non-refundable public grants and subsidies",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"275"	,code:	"404202"	,name:	"Hybrid Capital - Public guarantee funds for credit risks",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"276"	,code:	"404302"	,name:	"Hybrid Capital - Perpetual subordinated debts",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"277"	,code:	"404402"	,name:	"Hybrid Capital - Others",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"278"	,code:	"405102"	,name:	"Revenue Reserves  ",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"279"	,code:	"405202"	,name:	"Capital Reserves  ",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"280"	,code:	"405302"	,name:	"Subordinated debt approved by NBC",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"281"	,code:	"405402"	,name:	"Revaluation reserves approved by NBC  ",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"282"	,code:	"405502"	,name:	"Other Reserves",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"283"	,code:	"407102"	,name:	"Retained Earnings",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"284"	,code:	"408102"	,name:	"Profit Current Year",accountTypeId:	"30"	})
        ChartAccount.insert({_id:	"285"	,code:	"500002"	,name:	"Total Income Control Account",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"286"	,code:	"514102"	,name:	"Interest Income – Due from NBC",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"287"	,code:	"514202"	,name:	"Interest Income – Capital Guarantee Deposit  with NBC",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"288"	,code:	"514302"	,name:	"Interest Income – Other Demand Deposit with NBC",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"289"	,code:	"514602"	,name:	"Interest Income – Other Term Deposit with NBC",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"290"	,code:	"515102"	,name:	"Interest Income - Demand and Savings Deposits with Banks rated AAA to AA-",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"291"	,code:	"515202"	,name:	"Interest Income - Demand and Savings Deposits with Banks rated A+ to A-",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"292"	,code:	"515302"	,name:	"Interest Income - Demand and Savings Deposits with Banks rated below A-",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"293"	,code:	"516102"	,name:	"Interest Income - Time Deposits and Placements with Banks rated AAA to AA-",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"294"	,code:	"516202"	,name:	"Interest Income - Time Deposits and Placements with Banks rated A+ to A-",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"295"	,code:	"516302"	,name:	"Interest Income - Time Deposits and Placements with Banks rated below A-",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"296"	,code:	"517102"	,name:	"Interest income - Claims on Sovereigns rated AAA to AA-",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"297"	,code:	"517202"	,name:	"Interest Income - Claims on Sovereigns rated A+ to A-",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"298"	,code:	"517302"	,name:	"Interest Income - Claims on Sovereigns rated BBB+ to BBB-",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"299"	,code:	"517402"	,name:	"Interest Income - Claims on Sovereigns rated below BBB-",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"300"	,code:	"521102"	,name:	"Interest Income - Standard Loans – Groups <=1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"301"	,code:	"521202"	,name:	"Interest Income - Standard Loans – Individuals<=1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"302"	,code:	"521302"	,name:	"Interest Income - Standard Loans – Enterprises<=1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"303"	,code:	"521402"	,name:	"Interest Income - Standard Loans – Others<=1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"304"	,code:	"521512"	,name:	"Interest Income - Standard Loans – Related Party<=1 year - Shareholders",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"305"	,code:	"521522"	,name:	"Interest Income - Standard Loans – Related Party<=1 year - Managers",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"306"	,code:	"521532"	,name:	"Interest Income - Standard Loans – Related Party<=1 year - Employees",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"307"	,code:	"521542"	,name:	"Interest Income - Standard Loans – Related Party<=1 year - External Auditors",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"308"	,code:	"522102"	,name:	"Interest Income - Standard Loans – Groups>1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"309"	,code:	"522202"	,name:	"Interest Income - Standard Loans – Individuals>1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"310"	,code:	"522302"	,name:	"Interest Income - Standard Loans – Enterprises>1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"311"	,code:	"522402"	,name:	"Interest Income - Standard Loans – Others> 1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"312"	,code:	"522512"	,name:	"Interest Income - Standard Loans – Related Party>1 year - Shareholders",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"313"	,code:	"522522"	,name:	"Interest Income - Standard Loans – Related Party>1 year - Managers",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"314"	,code:	"522532"	,name:	"Interest Income - Standard Loans – Related Party>1 year - Employees",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"315"	,code:	"522542"	,name:	"Interest Income - Standard Loans – Related Party>1 year - External Auditors",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"316"	,code:	"523102"	,name:	"Interest Income - Substandard Loans - Groups<=1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"317"	,code:	"523202"	,name:	"Interest Income - Substandard Loans - Individuals<=1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"318"	,code:	"523302"	,name:	"Interest Income - Substandard Loans - Enterprises<=1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"319"	,code:	"523402"	,name:	"Interest Income - Substandard Loans - Others<=1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"320"	,code:	"523512"	,name:	"Interest Income - Substandard Loans - Related Party<=1 year - Shareholders",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"321"	,code:	"523522"	,name:	"Interest Income - Substandard Loans - Related Party<=1 year - Managers",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"322"	,code:	"523532"	,name:	"Interest Income - Substandard Loans - Related Party<=1 year - Employees",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"323"	,code:	"523542"	,name:	"Interest Income - Substandard Loans - Related Party<=1 year - External Auditors",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"324"	,code:	"524102"	,name:	"Interest Income - Substandard Loans - Groups>1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"325"	,code:	"524202"	,name:	"Interest Income - Substandard Loans - Individuals>1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"326"	,code:	"524302"	,name:	"Interest Income - Substandard Loans - Enterprises>1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"327"	,code:	"524402"	,name:	"Interest Income - Substandard Loans - Others>1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"328"	,code:	"524512"	,name:	"Interest Income - Substandard Loans - Related Party>1 year - Shareholders",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"329"	,code:	"524522"	,name:	"Interest Income - Substandard Loans - Related Party>1 year - Managers",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"330"	,code:	"524532"	,name:	"Interest Income - Substandard Loans - Related Party>1 year - Employees",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"331"	,code:	"524542"	,name:	"Interest Income - Substandard Loans - Related Party>1 year - External Auditors",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"332"	,code:	"525102"	,name:	"Interest Income - Doubtful Loans - Groups<=1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"333"	,code:	"525202"	,name:	"Interest Income - Doubtful Loans - Individuals<=1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"334"	,code:	"525302"	,name:	"Interest Income - Doubtful Loans - Enterprises<=1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"335"	,code:	"525402"	,name:	"Interest Income - Doubtful Loans - Others<=1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"336"	,code:	"525512"	,name:	"Interest Income - Doubtful Loans - Related Party<=1 year - Shareholders",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"337"	,code:	"525522"	,name:	"Interest Income - Doubtful Loans - Related Party<=1 year - Managers",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"338"	,code:	"525532"	,name:	"Interest Income - Doubtful Loans - Related Party<=1 year - Employees",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"339"	,code:	"525542"	,name:	"Interest Income - Doubtful Loans - Related Party<=1 year - External Auditors",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"340"	,code:	"526102"	,name:	"Interest Income - Doubtful Loans - Groups>1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"341"	,code:	"526202"	,name:	"Interest Income - Doubtful Loans - Individuals>1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"342"	,code:	"526302"	,name:	"Interest Income - Doubtful Loans - Enterprises>1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"343"	,code:	"526402"	,name:	"Interest Income - Doubtful Loans - Others>1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"344"	,code:	"526512"	,name:	"Interest Income - Doubtful Loans - Related Party>1 year - Shareholders",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"345"	,code:	"526522"	,name:	"Interest Income - Doubtful Loans - Related Party>1 year - Managers",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"346"	,code:	"526532"	,name:	"Interest Income - Doubtful Loans - Related Party>1 year - Employees",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"347"	,code:	"526542"	,name:	"Interest Income - Doubtful Loans - Related Party>1 year - External Auditors",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"348"	,code:	"527102"	,name:	"Interest Income - Loss Loans - Groups<=1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"349"	,code:	"527202"	,name:	"Interest Income - Loss Loans - Individuals<=1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"350"	,code:	"527302"	,name:	"Interest Income - Loss Loans - Enterprises<=1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"351"	,code:	"527402"	,name:	"Interest Income - Loss Loans - Others<=1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"352"	,code:	"527512"	,name:	"Interest Income - Loss Loans - Related Party<=1 year - Shareholders",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"353"	,code:	"527522"	,name:	"Interest Income - Loss Loans - Related Party<=1 year - Managers",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"354"	,code:	"527532"	,name:	"Interest Income - Loss Loans - Related Party<=1 year - Employees",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"355"	,code:	"527542"	,name:	"Interest Income - Loss Loans - Related Party<=1 year - External Auditors",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"356"	,code:	"528102"	,name:	"Interest Income - Loss Loans - Groups>1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"357"	,code:	"528202"	,name:	"Interest Income - Loss Loans - Individuals>1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"358"	,code:	"528302"	,name:	"Interest Income - Loss Loans - Enterprises>1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"359"	,code:	"528402"	,name:	"Interest Income - Loss Loans - Others>1 year",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"360"	,code:	"528512"	,name:	"Interest Income - Loss Loans - Related Party>1 year - Shareholders",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"361"	,code:	"528522"	,name:	"Interest Income - Loss Loans - Related Party>1 year - Managers",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"362"	,code:	"528532"	,name:	"Interest Income - Loss Loans - Related Party>1 year - Employees",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"363"	,code:	"528542"	,name:	"Interest Income - Loss Loans - Related Party>1 year - External Auditors",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"364"	,code:	"531102"	,name:	"Interest Income - Investment Securities - Hold to Maturity",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"365"	,code:	"532102"	,name:	"Interest Income - Investment Securities - Available for Sale",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"366"	,code:	"533102"	,name:	"Interest Income - Other Investment ",accountTypeId:	"40"	})
        ChartAccount.insert({_id:	"367"	,code:	"564102"	,name:	"Other Interest Income",accountTypeId:	"41"	})
        ChartAccount.insert({_id:	"368"	,code:	"571102"	,name:	"Fees and Commissions on loans",accountTypeId:	"41"	})
        ChartAccount.insert({_id:	"369"	,code:	"571202"	,name:	"Other Fees and Commissions ",accountTypeId:	"41"	})
        ChartAccount.insert({_id:	"370"	,code:	"572102"	,name:	"Fee Income for Wire Transfer/Remittance",accountTypeId:	"41"	})
        ChartAccount.insert({_id:	"371"	,code:	"573102"	,name:	"Other Non-Interest Income",accountTypeId:	"41"	})
        ChartAccount.insert({_id:	"372"	,code:	"574102"	,name:	"Foreign Exchange Gains",accountTypeId:	"41"	})
        ChartAccount.insert({_id:	"373"	,code:	"574202"	,name:	"Gains (Loss) on Revaluation of Trading/Marketable Securities",accountTypeId:	"41"	})
        ChartAccount.insert({_id:	"374"	,code:	"574302"	,name:	"Security Gains on Investment ",accountTypeId:	"41"	})
        ChartAccount.insert({_id:	"375"	,code:	"574402"	,name:	"Recovery on Loans Previously Charged – Off",accountTypeId:	"41"	})
        ChartAccount.insert({_id:	"376"	,code:	"574502"	,name:	"Gains on Sale/Disposal of Fixed Assets",accountTypeId:	"41"	})
        ChartAccount.insert({_id:	"377"	,code:	"585102"	,name:	"Insurance premiums on micro-insurance business",accountTypeId:	"41"	})
        ChartAccount.insert({_id:	"378"	,code:	"585202"	,name:	"Dividends Income ",accountTypeId:	"41"	})
        ChartAccount.insert({_id:	"379"	,code:	"585302"	,name:	"Grants Income ",accountTypeId:	"41"	})
        ChartAccount.insert({_id:	"380"	,code:	"600002"	,name:	"Total Expense Control Account",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"381"	,code:	"611102"	,name:	"Interest Expense - Amounts owed to NBC",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"382"	,code:	"612102"	,name:	"Interest Expense - Voluntary Deposits - Demand",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"383"	,code:	"612202"	,name:	"Interest Expense - Voluntary Deposits - Savings",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"384"	,code:	"612302"	,name:	"Interest Expense - Voluntary Deposits - Term",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"385"	,code:	"612402"	,name:	"Interest Expense - Voluntary Deposits - Other",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"386"	,code:	"612902"	,name:	"Interest Expense - Compulsory Deposits",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"387"	,code:	"622302"	,name:	"Interest Expense - Subordinated Debt",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"388"	,code:	"623102"	,name:	"Interest Expense - Short-term Borrowed Funds – Shareholders ",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"389"	,code:	"623202"	,name:	"Interest Expense - Short-term Borrowed Funds – Corporations, Associations, Organizations",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"390"	,code:	"623302"	,name:	"Interest Expense - Short-term Borrowed Funds - Banks",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"391"	,code:	"623402"	,name:	"Interest Expense - Short-term Borrowed Funds - Other",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"392"	,code:	"624102"	,name:	"Interest Expense - Long-term Borrowed Funds – Shareholders ",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"393"	,code:	"624202"	,name:	"Interest Expense - Long-term Borrowed Funds – Corporations, Associations, Organizations",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"394"	,code:	"624302"	,name:	"Interest Expense - Long-term Borrowed Funds - Banks",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"395"	,code:	"624402"	,name:	"Interest Expense - Long-term Borrowed Funds - Other",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"396"	,code:	"629902"	,name:	"Interest Expense - Other",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"397"	,code:	"631102"	,name:	"Salaries and Bonuses Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"398"	,code:	"631202"	,name:	"Employee Overtime Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"399"	,code:	"631302"	,name:	"Employee Training – Work Related Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"400"	,code:	"631402"	,name:	"Employee Medical Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"401"	,code:	"631802"	,name:	"Employee Pension Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"402"	,code:	"631902"	,name:	"Other Employee Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"403"	,code:	"642102"	,name:	"Depreciation Expense – Land Improvements",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"404"	,code:	"642202"	,name:	"Depreciation Expense – Building",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"405"	,code:	"642302"	,name:	"Depreciation Expense – Leasehold Improvement ",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"406"	,code:	"642352"	,name:	"Depreciation Expenses - Furniture and Fixtures ",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"407"	,code:	"642402"	,name:	"Depreciation Expenses - Equipment ",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"408"	,code:	"642502"	,name:	"Depreciation Expenses – Computer Equipment ",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"409"	,code:	"642602"	,name:	"Depreciation Expenses – Motor Vehicles ",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"410"	,code:	"642702"	,name:	"Depreciation Expenses – Other Fixed Assets ",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"411"	,code:	"643102"	,name:	"Amortization Expenses – Intangible Assets",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"412"	,code:	"643202"	,name:	"Amortization Expenses – Formation Expenses",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"413"	,code:	"653102"	,name:	"Repair and Maintenance Expenses",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"414"	,code:	"653202"	,name:	"Rental Expenses",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"415"	,code:	"653302"	,name:	"Utility Expenses",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"416"	,code:	"653402"	,name:	"Small items of furniture, fixtures and equipment not capitalized",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"417"	,code:	"654102"	,name:	"Marketing and Advertising Expenses",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"418"	,code:	"654202"	,name:	"Professional Services Expense ",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"419"	,code:	"654302"	,name:	"Audit and Tax Fees Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"420"	,code:	"654402"	,name:	"License Fees Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"421"	,code:	"654502"	,name:	"Legal Fees Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"422"	,code:	"655102"	,name:	"Travel Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"423"	,code:	"655202"	,name:	"Business Meal and Entertainment Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"424"	,code:	"655302"	,name:	"Communication Expenses",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"425"	,code:	"657102"	,name:	"Stationery and Supplies Expenses ",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"426"	,code:	"657202"	,name:	"Printing and Forms Expenses ",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"427"	,code:	"658102"	,name:	"Fire and Hazard Insurance Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"428"	,code:	"658902"	,name:	"Other Insurance Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"429"	,code:	"661102"	,name:	"Security Expense ",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"430"	,code:	"662102"	,name:	"Board of Directors' Fees",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"431"	,code:	"662202"	,name:	"Shareholders' Meeting Expense ",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"432"	,code:	"663102"	,name:	"Charitable Donation Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"433"	,code:	"664102"	,name:	"Dues and Memberships Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"434"	,code:	"666102"	,name:	"Penalties and Fines Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"435"	,code:	"668102"	,name:	"Motor Vehicle Operating Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"436"	,code:	"669102"	,name:	"Income Tax Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"437"	,code:	"669902"	,name:	"Miscellaneous Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"438"	,code:	"671102"	,name:	"Bad and Doubtful Debts",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"439"	,code:	"671302"	,name:	"Off Balance Sheet Loss Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"440"	,code:	"671402"	,name:	"Doubtful and Loss of Securities",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"441"	,code:	"671502"	,name:	"Write off on uncollectable loans non covered by provisions",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"442"	,code:	"671602"	,name:	"Global and General Provision other than Loans",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"443"	,code:	"681102"	,name:	"Loss on Foreign Exchange ",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"444"	,code:	"681402"	,name:	"Loss on Sale/Disposal of Security Investment Expense",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"445"	,code:	"681602"	,name:	"Loss on Sale/Disposal of Assets ",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"446"	,code:	"691102"	,name:	"Rebates/Commissions to Borrowing Groups",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"447"	,code:	"691202"	,name:	"Village Bank/Association costs",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"448"	,code:	"692102"	,name:	"Correspondent Bank Charges",accountTypeId:	"50"	})
        ChartAccount.insert({_id:	"449"	,code:	"692202"	,name:	"Fee and Commission on Borrowing",accountTypeId:	"50"	})
*/





















    //    ICe

            /*ChartAccount.insert({_id:	"001"	,code:	"1000"	,name:	"Total Cash",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"002"	,code:	"1010"	,name:	"Total Cash:Total Cash at Bank",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"003"	,code:	"1011"	,name:	"Total Cash:Total Cash at Bank:Cash at CIMB Bank ( $ )",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"004"	,code:	"1012"	,name:	"Total Cash:Total Cash at Bank:Cash at Canadia Bank ( Riel )",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"005"	,code:	"1120"	,name:	"Total Cash:Total Cash on Hand",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"006"	,code:	"1121"	,name:	"Total Cash:Total Cash on Hand:Cash at Exchange House 73 ( R )",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"007"	,code:	"1122"	,name:	"Total Cash:Total Cash on Hand:Cash on Hand ( $ )",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"008"	,code:	"1123"	,name:	"Total Cash:Total Cash on Hand:Cash on Hand ( Riel )",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"009"	,code:	"1200"	,name:	"Account Receivable",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"010"	,code:	"1210"	,name:	"Account Receivable:A/R of Ice Cube Product",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"011"	,code:	"1300"	,name:	"Inventory Asset",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"012"	,code:	"1310"	,name:	"Inventory Asset:Inventory of Ice Cube Product",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"013"	,code:	"1350"	,name:	"Loan to Partners",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"014"	,code:	"1351"	,name:	"Loan to Partners:Loan to partner 1",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"015"	,code:	"1360"	,name:	"Loan to Staff",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"016"	,code:	"1361"	,name:	"Loan to Staff:Loan to Mr 1",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"017"	,code:	"1370"	,name:	"Advance",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"018"	,code:	"1410"	,name:	"Prepaid",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"019"	,code:	"1411"	,name:	"Prepaid:Prepaid Water Supplies",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"020"	,code:	"1412"	,name:	"Prepaid:Prepaid Insurance",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"021"	,code:	"1413"	,name:	"Prepaid:Prepaid Electricity",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"022"	,code:	"1414"	,name:	"Prepaid:Prepaid Patent",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"023"	,code:	"1415"	,name:	"Prepaid:Prepaid Brand",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"024"	,code:	"1416"	,name:	"Prepaid:Prepaid Company Register",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"025"	,code:	"1417"	,name:	"Prepaid:Prepaid Loan Commission",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"026"	,code:	"1418"	,name:	"Prepaid:Prepaid Import Duty",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"027"	,code:	"1419"	,name:	"Prepaid:Prepaid Telephone",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"028"	,code:	"1420"	,name:	"Prepaid:Prepaid Internet",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"029"	,code:	"1421"	,name:	"Prepaid:Prepaid Office Rental",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"030"	,code:	"1430"	,name:	"Office Supplies",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"031"	,code:	"1431"	,name:	"Office Supplies:Stationery",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"032"	,code:	"1432"	,name:	"Office Supplies:Office Material",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"033"	,code:	"1450"	,name:	"Promotion & Discount Receivable",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"034"	,code:	"1470"	,name:	"Investment",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"035"	,code:	"1480"	,name:	"Prepayment Tax",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"036"	,code:	"1499"	,name:	"Undeposited Funds",accountTypeId:	"10"	});
            ChartAccount.insert({_id:	"037"	,code:	"1600"	,name:	"Land and Building",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"038"	,code:	"1610"	,name:	"Land and Building:Land",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"039"	,code:	"1620"	,name:	"Land and Building:Building",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"040"	,code:	"1621"	,name:	"Land and Building:Building:Cost of Building",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"041"	,code:	"1622"	,name:	"Land and Building:Building:Accu-Depre of Building",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"042"	,code:	"1630"	,name:	"Land and Building:Office and Warehouse",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"043"	,code:	"1631"	,name:	"Land and Building:Office and Warehouse:Cost of Office and Warehouse",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"044"	,code:	"1632"	,name:	"Land and Building:Office and Warehouse:Accu-Depre of Office &Warehouse",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"045"	,code:	"1640"	,name:	"Land and Building:Building Improvement",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"046"	,code:	"1641"	,name:	"Land and Building:Building Improvement:Cost of Building Improvement",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"047"	,code:	"1642"	,name:	"Land and Building:Building Improvement:Accu-Depre of Building Improv.",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"048"	,code:	"1680"	,name:	"Computer and Soft Ware",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"049"	,code:	"1681"	,name:	"Computer and Soft Ware:Cost of Computer and Soft Ware",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"050"	,code:	"1682"	,name:	"Computer and Soft Ware:Accu-Depre of Computer &Soft.",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"051"	,code:	"1700"	,name:	"Furniture and Equipment",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"052"	,code:	"1701"	,name:	"Furniture and Equipment:Cost of Furniture and Equipment",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"053"	,code:	"1702"	,name:	"Furniture and Equipment:Accu-Depre of Furniture & Equip",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"054"	,code:	"1700"	,name:	"Accumulated Depreciation",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"055"	,code:	"1740"	,name:	"Other Equipment and Facilities",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"056"	,code:	"1741"	,name:	"Other Equipment and Facilities:Cost of Other Equipment &Faci.",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"057"	,code:	"1742"	,name:	"Other Equipment and Facilities:Accu-Depre of Other Equipment",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"058"	,code:	"1750"	,name:	"Plant Equipment",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"059"	,code:	"1751"	,name:	"Plant Equipment:Cost of Plant Equipment",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"060"	,code:	"1752"	,name:	"Plant Equipment:Accu-Depre of Plant Equipment",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"061"	,code:	"1800"	,name:	"Vehicles",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"062"	,code:	"1810"	,name:	"Vehicles:Motor Trailer",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"063"	,code:	"1811"	,name:	"Vehicles:Motor Trailer:Cost of Motor Trailer",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"064"	,code:	"1812"	,name:	"Vehicles:Motor Trailer:Accu-Depre of Motor Trailer",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"065"	,code:	"1820"	,name:	"Vehicles:Truck",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"066"	,code:	"1821"	,name:	"Vehicles:Truck:Cost of Truck",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"067"	,code:	"1822"	,name:	"Vehicles:Truck:Accu-Depre of Truck",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"068"	,code:	"1900"	,name:	"Investment on Tong Tin",accountTypeId:	"11"	});
            ChartAccount.insert({_id:	"069"	,code:	"1990"	,name:	"Other Fixed asset",accountTypeId:	"12"	});
            ChartAccount.insert({_id:	"070"	,code:	"2000"	,name:	"Account Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"071"	,code:	"2010"	,name:	"Account Payable:A/P of Ice Cube Product",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"072"	,code:	"2020"	,name:	"Account Payable:A/P of Plastic Bags",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"073"	,code:	"2100"	,name:	"Plant Supplies Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"074"	,code:	"2110"	,name:	"Plant Supplies Payable:Water of Plant Supplies Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"075"	,code:	"2120"	,name:	"Plant Supplies Payable:Sparepart Plant Supply Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"076"	,code:	"2200"	,name:	"Construction Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"077"	,code:	"2300"	,name:	"Payroll Liabilities",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"078"	,code:	"2305"	,name:	"Payroll Tax Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"079"	,code:	"2310"	,name:	"Promotion Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"080"	,code:	"2320"	,name:	"Incentive Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"081"	,code:	"2330"	,name:	"Transportation Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"082"	,code:	"2340"	,name:	"Office Rental Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"083"	,code:	"2341"	,name:	"Office Rental Payable:Office Rental Payble in BTB",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"084"	,code:	"2350"	,name:	"Telephone Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"085"	,code:	"2360"	,name:	"Electricity Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"086"	,code:	"2370"	,name:	"Cable TV Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"087"	,code:	"2380"	,name:	"Gas and Oil Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"088"	,code:	"2390"	,name:	"Maintenance Support Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"089"	,code:	"2400"	,name:	"Interest Payable to Bank",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"090"	,code:	"2400"	,name:	"*Payroll Liabilities",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"091"	,code:	"2410"	,name:	"Income Tax Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"092"	,code:	"2415"	,name:	"Contribution to NSSF Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"093"	,code:	"2420"	,name:	"Unearned Ice Cube Income",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"094"	,code:	"2425"	,name:	"Security Guard Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"095"	,code:	"2430"	,name:	"Unearned Sale Promotion Support",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"096"	,code:	"2440"	,name:	"Repair Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"097"	,code:	"2450"	,name:	"Vehicle Sparepart Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"098"	,code:	"2460"	,name:	"Plastic Bag Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"099"	,code:	"2470"	,name:	"Advertising Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"100"	,code:	"2475"	,name:	"Bonus for Staff Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"101"	,code:	"2480"	,name:	"Internet Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"102"	,code:	"2485"	,name:	"Garbage Payable",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"103"	,code:	"2490"	,name:	"Other Liabilities",accountTypeId:	"20"	});
            ChartAccount.insert({_id:	"104"	,code:	"2500"	,name:	"Loan Payable",accountTypeId:	"21"	});
            ChartAccount.insert({_id:	"105"	,code:	"2510"	,name:	"Loan Payable:Loan from Bank",accountTypeId:	"21"	});
            ChartAccount.insert({_id:	"106"	,code:	"2511"	,name:	"Loan Payable:Loan from Bank:CIMB Bank Loan",accountTypeId:	"21"	});
            ChartAccount.insert({_id:	"107"	,code:	"2520"	,name:	"Loan Payable:Loan from Partners",accountTypeId:	"21"	});
            ChartAccount.insert({_id:	"108"	,code:	"2521"	,name:	"Loan Payable:Loan from Partners:Loan From Partner 1",accountTypeId:	"21"	});
            ChartAccount.insert({_id:	"109"	,code:	"3000"	,name:	"Opening Bal Equity",accountTypeId:	"30"	});
            ChartAccount.insert({_id:	"110"	,code:	"3100"	,name:	"Opening Bal Equity:Mr. Om Beng Phy's Equity",accountTypeId:	"30"	});
            ChartAccount.insert({_id:	"111"	,code:	"3110"	,name:	"Opening Bal Equity:Mr. Om Beng Phy's Equity:Mr. Om Beng Phy's Open Equity",accountTypeId:	"30"	});
            ChartAccount.insert({_id:	"112"	,code:	"3120"	,name:	"Opening Bal Equity:Mr. Om Beng Phy's Equity:Mr. Om Beng Phy's Drawing",accountTypeId:	"30"	});
            ChartAccount.insert({_id:	"113"	,code:	"3800"	,name:	"Dividend",accountTypeId:	"30"	});
            ChartAccount.insert({_id:	"114"	,code:	"3900"	,name:	"Retained Earnings",accountTypeId:	"30"	});
            ChartAccount.insert({_id:	"115"	,code:	"4000"	,name:	"Total Income",accountTypeId:	"40"	});
            ChartAccount.insert({_id:	"116"	,code:	"4010"	,name:	"Total Income:Total Income of Ice Product",accountTypeId:	"40"	});
            ChartAccount.insert({_id:	"117"	,code:	"4011"	,name:	"Total Income:Total Income of Ice Product:Income of Ice Product",accountTypeId:	"40"	});
            ChartAccount.insert({_id:	"118"	,code:	"4012"	,name:	"Total Income:Total Income of Ice Product:Discount & Commission Ice",accountTypeId:	"40"	});
            ChartAccount.insert({_id:	"119"	,code:	"4990"	,name:	"Uncategorized Income",accountTypeId:	"40"	});
            ChartAccount.insert({_id:	"120"	,code:	"5000"	,name:	"Cost of Goods Sold",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"121"	,code:	"5100"	,name:	"Cost of Goods Sold:Total COGS of Ice Cube Product",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"122"	,code:	"5010"	,name:	"Cost of Goods Sold:Total COGS of Ice Cube Product:COGS of Long Ice Cube Product",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"123"	,code:	"5020"	,name:	"Cost of Goods Sold:Total COGS of Ice Cube Product:Ice Cube Project Supply Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"124"	,code:	"5021"	,name:	"Cost of Goods Sold:Total COGS of Ice Cube Product:Ice Cube Project Supply Expense:Electricity of Plant Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"125"	,code:	"5022"	,name:	"Cost of Goods Sold:Total COGS of Ice Cube Product:Ice Cube Project Supply Expense:Water of Plant Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"126"	,code:	"5023"	,name:	"Cost of Goods Sold:Total COGS of Ice Cube Product:Ice Cube Project Supply Expense:Plastic Bag Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"127"	,code:	"5029"	,name:	"Cost of Goods Sold:Total COGS of Ice Cube Product:Ice Cube Project Supply Expense:Other Plant Supplies Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"128"	,code:	"6110"	,name:	"Total Office Rental Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"129"	,code:	"6111"	,name:	"Total Office Rental Expense:Office Rental Expense in BTB",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"130"	,code:	"6120"	,name:	"Transportation Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"131"	,code:	"6121"	,name:	"Transportation Expense:Transport Ice Cube Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"132"	,code:	"6129"	,name:	"Transportation Expense:Other Transport Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"133"	,code:	"6130"	,name:	"Bank Service Charge",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"134"	,code:	"6131"	,name:	"Bank Service Charge:Bank Charge In",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"135"	,code:	"6132"	,name:	"Bank Service Charge:Bank Charge Out",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"136"	,code:	"6133"	,name:	"Bank Service Charge:Cheque Book Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"137"	,code:	"6140"	,name:	"Office Supplies Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"138"	,code:	"6141"	,name:	"Office Supplies Expense:Stationery Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"139"	,code:	"6142"	,name:	"Office Supplies Expense:Photocopy Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"140"	,code:	"6143"	,name:	"Office Supplies Expense:Publish Document Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"141"	,code:	"6150"	,name:	"Office Material Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"142"	,code:	"6151"	,name:	"Office Material Expense:Office Material Use Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"143"	,code:	"6152"	,name:	"Office Material Expense:Office Cleaning Material Expens",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"144"	,code:	"6160"	,name:	"Telephone Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"145"	,code:	"6161"	,name:	"Telephone Expense:Office Telephone",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"146"	,code:	"6162"	,name:	"Telephone Expense:Staff Telephone Support",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"147"	,code:	"6163"	,name:	"Telephone Expense:Shareholder Telephone",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"148"	,code:	"6170"	,name:	"Postage Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"149"	,code:	"6180"	,name:	"Internet and E-mail Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"150"	,code:	"6190"	,name:	"Wage for Lift-up Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"151"	,code:	"6191"	,name:	"Wage for Lift-up Expense:Wage for Lift-up Ice Cube",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"152"	,code:	"6199"	,name:	"Wage for Lift-up Expense:Other Wage for Lift-up",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"153"	,code:	"6300"	,name:	"Meal and Snack Epenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"154"	,code:	"6301"	,name:	"Meal and Snack Epenses:Meal Support for Staff Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"155"	,code:	"6302"	,name:	"Meal and Snack Epenses:Snack or Beverage Staff Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"156"	,code:	"6310"	,name:	"Mission of Staff",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"157"	,code:	"6330"	,name:	"Entertain &Travel Shareholder",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"158"	,code:	"6340"	,name:	"Repair Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"159"	,code:	"6341"	,name:	"Repair Expenses:Repair Office Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"160"	,code:	"6342"	,name:	"Repair Expenses:Repair Computer and Soft Ware",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"161"	,code:	"6343"	,name:	"Repair Expenses:Repair Equipment & Furniture",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"162"	,code:	"6344"	,name:	"Repair Expenses:Repair Other Equipment and Faci",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"163"	,code:	"6345"	,name:	"Repair Expenses:Repair Plant Equipment Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"164"	,code:	"6346"	,name:	"Repair Expenses:Repair Vehicles Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"165",parentId: "164",level:1	,code:	"6346-A"	,name:	"Repair Expenses:Repair Vehicles Expenses:Repair Motor Trailer",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"166",parentId: "164",level:1	,code:	"6346-B"	,name:	"Repair Expenses:Repair Vehicles Expenses:Repair Truck Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"167",parentId: "164",level:1	,code:	"6346-C"	,name:	"Repair Expenses:Repair Vehicles Expenses:Vehicle Sparepart Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"168",parentId: "164",level:1	,code:	"6346-D"	,name:	"Repair Expenses:Repair Vehicles Expenses:Construction in Factory Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"169",parentId: "164",level:1	,code:	"6347"	,name:	"Repair Expenses:Repair Electricity",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"170"	,code:	"6348"	,name:	"Repair Expenses:Repair Water System",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"171"	,code:	"6349"	,name:	"Repair Expenses:Repair Machin Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"172"	,code:	"6350"	,name:	"Gas and Oil Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"173"	,code:	"6351"	,name:	"Gas and Oil Expenses:Gasoline of Motor Trailer",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"174"	,code:	"6352"	,name:	"Gas and Oil Expenses:Gas of Truck",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"175"	,code:	"6353"	,name:	"Gas and Oil Expenses:Gasoline Support to Staff",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"176"	,code:	"6354"	,name:	"Gas and Oil Expenses:Diesel of generator",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"177"	,code:	"6355"	,name:	"Gas and Oil Expenses:Brake Oil",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"178"	,code:	"6356"	,name:	"Gas and Oil Expenses:Engine Oil",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"179"	,code:	"6357"	,name:	"Gas and Oil Expenses:Diesel of Truck",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"180"	,code:	"6360"	,name:	"Staff Motor Maintenance",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"181"	,code:	"6370"	,name:	"Build System of POS(Beng Phy)",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"182"	,code:	"6380"	,name:	"Facilities for Staff",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"183"	,code:	"6390"	,name:	"Monthly Support to Shareholder",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"184"	,code:	"6400"	,name:	"Utilities Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"185"	,code:	"6401"	,name:	"Utilities Expenses:Water Supplies Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"186"	,code:	"6402"	,name:	"Utilities Expenses:Pure Water Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"187"	,code:	"6403"	,name:	"Utilities Expenses:Electricity Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"188"	,code:	"6404"	,name:	"Utilities Expenses:Cable TV Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"189"	,code:	"6405"	,name:	"Utilities Expenses:Garbage Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"190"	,code:	"6406"	,name:	"Utilities Expenses:Bag Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"191"	,code:	"6407"	,name:	"Utilities Expenses:Others Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"192"	,code:	"6410"	,name:	"Payroll Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"193"	,code:	"6420"	,name:	"Bonus to Staff Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"194"	,code:	"6430"	,name:	"Training Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"195"	,code:	"6440"	,name:	"Insurance Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"196"	,code:	"6450"	,name:	"Tour Visit",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"197"	,code:	"6460"	,name:	"Health Support",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"198"	,code:	"6470"	,name:	"Staff Party Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"199"	,code:	"6480"	,name:	"Security Guard Service",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"200"	,code:	"6500"	,name:	"Cleaning Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"201"	,code:	"6501"	,name:	"Cleaning Expenses:Cleaning Office Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"202"	,code:	"6502"	,name:	"Cleaning Expenses:Cleaning Truck Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"203"	,code:	"6503"	,name:	"Cleaning Expenses:Cleaning Motor Trailer Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"204"	,code:	"6504"	,name:	"Cleaning Expenses:Cleaning Motorbike Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"205"	,code:	"6510"	,name:	"Legal Service Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"206"	,code:	"6520"	,name:	"Food Offering",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"207"	,code:	"6590"	,name:	"Office Decoration Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"208"	,code:	"6600"	,name:	"Advertising & Promotion Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"209"	,code:	"6610"	,name:	"Advertising & Promotion Expense:Advertising Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"210"	,code:	"6611"	,name:	"Advertising & Promotion Expense:Advertising Expense:Radia Advertising",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"211"	,code:	"6612"	,name:	"Advertising & Promotion Expense:Advertising Expense:TV Advertising",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"212"	,code:	"6613"	,name:	"Advertising & Promotion Expense:Advertising Expense:Banner Advertising",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"213"	,code:	"6614"	,name:	"Advertising & Promotion Expense:Advertising Expense:Leaflet Advertising",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"214"	,code:	"6615"	,name:	"Advertising & Promotion Expense:Advertising Expense:T-Shirt Printing",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"215"	,code:	"6620"	,name:	"Advertising & Promotion Expense:Exhibition Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"216"	,code:	"6630"	,name:	"Advertising & Promotion Expense:Promotion Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"217"	,code:	"6640"	,name:	"Advertising & Promotion Expense:Bonus to Dealer Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"218"	,code:	"6650"	,name:	"Advertising & Promotion Expense:Seminar & Workshop Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"219"	,code:	"6660"	,name:	"Advertising & Promotion Expense:Testing Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"220"	,code:	"6670"	,name:	"Advertising & Promotion Expense:Meal & Snack with counterpart",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"221"	,code:	"6680"	,name:	"Advertising & Promotion Expense:Gift to counterpart",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"222"	,code:	"6690"	,name:	"Advertising & Promotion Expense:Dealer Party Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"223"	,code:	"6600"	,name:	"*Payroll Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"224"	,code:	"6700"	,name:	"Contribution Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"225"	,code:	"6701"	,name:	"Contribution Expenses:Celebration Contribution",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"226"	,code:	"6702"	,name:	"Contribution Expenses:Chairty Contribution",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"227"	,code:	"6703"	,name:	"Contribution Expenses:Contribution to Publice Officer",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"228"	,code:	"6730"	,name:	"Goods damage expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"229"	,code:	"6740"	,name:	"Loss on Exchange Rate",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"230"	,code:	"6750"	,name:	"Other Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"231"	,code:	"6751"	,name:	"Other Expenses:Property Evaluation Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"232"	,code:	"6752"	,name:	"Other Expenses:Parking Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"233"	,code:	"6753"	,name:	"Other Expenses:Pesticide Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"234"	,code:	"6790"	,name:	"Other Expenses:Miscellaneous Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"235"	,code:	"6810"	,name:	"Govenment Fee Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"236"	,code:	"6811"	,name:	"Govenment Fee Expense:Property Tax Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"237"	,code:	"6812"	,name:	"Govenment Fee Expense:Annual Closing Statement",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"238"	,code:	"6813"	,name:	"Govenment Fee Expense:Annual Tax of Motor Trailer",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"239"	,code:	"6814"	,name:	"Govenment Fee Expense:Annual Tax of Truck",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"240"	,code:	"6815"	,name:	"Govenment Fee Expense:Contribution to NSSF",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"241"	,code:	"6816"	,name:	"Govenment Fee Expense:Commercial Certificate Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"242"	,code:	"6817"	,name:	"Govenment Fee Expense:Camcontrol Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"243"	,code:	"6818"	,name:	"Govenment Fee Expense:Import Duty Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"244"	,code:	"6819"	,name:	"Govenment Fee Expense:Vehicle Inspection Expnse",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"245"	,code:	"6820"	,name:	"Govenment Fee Expense:Document Certified by Officer",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"246"	,code:	"6828"	,name:	"Govenment Fee Expense:Fine Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"247"	,code:	"6829"	,name:	"Govenment Fee Expense:Other tax fee",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"248"	,code:	"6900"	,name:	"Amortization Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"249"	,code:	"6901"	,name:	"Amortization Expenses:Amortiation Patent",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"250"	,code:	"6902"	,name:	"Amortization Expenses:Amortization Brand",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"251"	,code:	"6910"	,name:	"Depreciation Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"252"	,code:	"6911"	,name:	"Depreciation Expenses:Depre of Building",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"253"	,code:	"6912"	,name:	"Depreciation Expenses:Depre of Building Improvement",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"254"	,code:	"6913"	,name:	"Depreciation Expenses:Depre of Computure -Soft Ware",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"255"	,code:	"6914"	,name:	"Depreciation Expenses:Depre of Furniture and Equip.",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"256"	,code:	"6915"	,name:	"Depreciation Expenses:Depre of Other Equipment-Facili",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"257"	,code:	"6916"	,name:	"Depreciation Expenses:Depre of Plant Equipment",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"258"	,code:	"6917"	,name:	"Depreciation Expenses:Depre of Vehicles",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"259"	,code:	"6950"	,name:	"Interest Expense",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"260"	,code:	"6951"	,name:	"Interest Expense:Interest Expense to CIMB Bank",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"261"	,code:	"6959"	,name:	"Interest Expense:Interest Expense other partner",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"262"	,code:	"6980"	,name:	"Uncategorized Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"263"	,code:	"6990"	,name:	"Income Tax Expenses",accountTypeId:	"50"	});
            ChartAccount.insert({_id:	"264"	,code:	"4410"	,name:	"Interest Income",accountTypeId:	"40"	});
            ChartAccount.insert({_id:	"265"	,code:	"4411"	,name:	"Interest Income:Interest Income from CIMB Bank",accountTypeId:	"40"	});
            ChartAccount.insert({_id:	"266"	,code:	"4412"	,name:	"Interest Income:Interest Income from Canadia",accountTypeId:	"40"	});
            ChartAccount.insert({_id:	"267"	,code:	"4420"	,name:	"Promotion Support Income",accountTypeId:	"40"	});
            ChartAccount.insert({_id:	"268"	,code:	"4430"	,name:	"Purchase Disicount",accountTypeId:	"40"	});
            ChartAccount.insert({_id:	"269"	,code:	"4440"	,name:	"Compensation Income",accountTypeId:	"40"	});
            ChartAccount.insert({_id:	"270"	,code:	"4500"	,name:	"Bonus from Suppliers",accountTypeId:	"40"	});
            ChartAccount.insert({_id:	"271"	,code:	"4580"	,name:	"Gain on Exchange Rate",accountTypeId:	"40"	});
            ChartAccount.insert({_id:	"272"	,code:	"4590"	,name:	"Other Incomes",accountTypeId:	"40"	});
*/
        }
});