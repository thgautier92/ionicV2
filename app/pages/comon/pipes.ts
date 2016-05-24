import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({ name: 'objToArray', pure: false })
export class ValuesPipe implements PipeTransform {
  transform(dict: Object): any {
    var a = [];
    for (var key in dict) {
      if (dict.hasOwnProperty(key)) {
        a.push({ key: key, value: dict[key] });
        //console.log(key,dict[key]);
      }
    }
    return a;
  }
}
@Pipe({ name: 'binaryData' })
export class binaryData {
  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(value, mime?) {
    var temp = value.substring(4, value.length - 1);
    //console.log(temp, mime[0]);
    var file = new Blob([value], { type: mime[0] });
    var retUrl = URL.createObjectURL(file);
    //console.log(retUrl);
    return file
  }
}
@Pipe({ name: 'groupBy' })
export class groupBy implements PipeTransform {
  transform(collection: any, getter: any,subgetter?:any): any {
    var result = {};
    var prop;
    for (var elm in collection) {
      prop = collection[elm][getter];
      if(subgetter) prop=prop[subgetter];
      //console.log("GROUP BY:",collection,elm,getter,prop);
      if (!result[prop]) {
        result[prop] = [];
      }
      result[prop].push(collection[elm]);
    };
    return result;
  }
}
@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    for (let key in value) {
      keys.push({ key: key, value: value[key] });
    }
    return keys;
  }
}