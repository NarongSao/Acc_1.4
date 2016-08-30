import {Currency} from '../../imports/api/collections/currency';
import './_init.js';
/**
 * Currency
 */

Currency.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
Currency.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
Currency.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();
