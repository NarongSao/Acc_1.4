import {Meteor} from 'meteor/meteor';
import {_} from 'meteor/erasaur:meteor-lodash';

import {MapClosing} from '../../imports/api/collections/mapCLosing';
Meteor.startup(function() {
  if (MapClosing.find().count() == 0) {

    MapClosing.insert({
      chartAccountCompare: 'Equivalance Exchange Account',
    });
    MapClosing.insert({
      chartAccountCompare: 'Foreign Exchange Gain',
    });
    MapClosing.insert({
      chartAccountCompare: 'Loss on Foreign Exchange',
    });

    MapClosing.insert({
      chartAccountCompare: 'Retain Earning',
    });







    /// Migrate
    /*MapClosing.insert({
      chartAccountCompare: 'Account Receivable',
    });
     MapClosing.insert({
      chartAccountCompare: 'Account Payable',
    });
     MapClosing.insert({
      chartAccountCompare: 'Cash On Hand',
    });
     MapClosing.insert({
      chartAccountCompare: 'Purchase Discount',
    });
     MapClosing.insert({
      chartAccountCompare: 'Borrow',
    });
     MapClosing.insert({
      chartAccountCompare: 'Account Receivable (SO)',
    });
     MapClosing.insert({
      chartAccountCompare: 'Account Payable (SO)',
    });
     MapClosing.insert({
      chartAccountCompare: 'Own Inventory (SO)',
    });
     MapClosing.insert({
      chartAccountCompare: 'Company Owe Inventory (SO)',
    });
     MapClosing.insert({
      chartAccountCompare: 'Owe Inventory',
    });
     MapClosing.insert({
      chartAccountCompare: 'Transport Revenue',
    });
     MapClosing.insert({
      chartAccountCompare: 'Transport Expense',
    });*/


  }
});
