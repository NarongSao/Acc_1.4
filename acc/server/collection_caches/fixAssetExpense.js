
import 'meteor/theara:collection-cache';

// Collection
import {FixAssetExpense} from '../../imports/api/collections/fixAssetExpense';

FixAssetExpense.cacheTimestamp();
FixAssetExpense._ensureIndex({date: 1}, {unique: 1});