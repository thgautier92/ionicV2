import {Component} from 'angular2/core';

/*
  Generated class for the Test component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'test',
  templateUrl: 'build/components/test/test.html'
})
export class Test {
  constructor() {
    this.text = 'Hello World';
  }
}
