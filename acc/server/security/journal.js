
import {Journal} from '../../imports/api/collections/journal';
import './_init.js';
/**
 * Journal
 */

Journal.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
Journal.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
Journal.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();
