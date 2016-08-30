import {DateEndOfProcess} from '../../imports/api/collections/dateEndOfProcess';
import './_init.js';
/**
 * DateEndOfProcess
 */

DateEndOfProcess.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
DateEndOfProcess.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
DateEndOfProcess.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();
