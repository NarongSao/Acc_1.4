import {DepExpList} from '../../imports/api/collections/depExpList';
import './_init.js';
/**
 * Journal
 */


DepExpList.permit(['insert'])
    .Acc_ifDataInsert()
    .allowInClientCode();
DepExpList.permit(['update'])
    .Acc_ifDataUpdate()
    .allowInClientCode();
DepExpList.permit(['remove'])
    .Acc_ifDataRemove()
    .allowInClientCode();

