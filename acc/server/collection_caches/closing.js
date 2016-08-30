import 'meteor/theara:collection-cache';

// Collection
import {Closing} from '../../imports/api/collections/closing';


Closing.cacheTimestamp();
Closing._ensureIndex({dateFrom: 1,dateTo: 1}, {unique: 1});