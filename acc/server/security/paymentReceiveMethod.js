
import {PaymentReceiveMethod} from '../../imports/api/collections/paymentReceiveMethod';
import './_init.js';

/**
 * chart of Account
 */

PaymentReceiveMethod.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
PaymentReceiveMethod.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
PaymentReceiveMethod.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();
