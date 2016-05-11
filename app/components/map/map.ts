import {Component} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

/*
  Generated class for the Map component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'map',
  templateUrl: 'build/components/map/map.html',
  directives: [IONIC_DIRECTIVES]
})
export class Map {
  constructor() {
    this.text = 'Hello World';
  }
}
