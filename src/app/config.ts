import { Injectable } from '@angular/core';
import * as _ from "lodash"

_.mixin({
  'mergeByKey' : function(arr1, arr2, key) {
    var criteria = {};
    criteria[key] = null;
    return _.map(arr1, function(item) {
      criteria[key] = item[key];
      return _.merge(item, _.find(arr2, criteria));
    });
  }
});
@Injectable()
export class Config {
  public static api: String = 'http://localhost:9000/api';
}