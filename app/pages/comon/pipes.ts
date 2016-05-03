import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({ name: 'objToArray',  pure: false })
export class ValuesPipe implements PipeTransform {
  transform(dict: Object): any {
    var a = [];
    for (var key in dict) {
      if (dict.hasOwnProperty(key)) {
        a.push({key: key, value: dict[key]});
        console.log(key,dict[key]);
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
    console.log(temp, mime[0]);
    var file = new Blob([value], { type: mime[0] });
    var retUrl = URL.createObjectURL(file);
    console.log(retUrl);
    return file
  }
}