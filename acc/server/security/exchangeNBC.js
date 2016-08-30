import {ExchangeNBC} from '../../imports/api/collections/exchangeNBC';
import './_init.js';

/**
 * Currency
 */

ExchangeNBC.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
ExchangeNBC.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
ExchangeNBC.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();
