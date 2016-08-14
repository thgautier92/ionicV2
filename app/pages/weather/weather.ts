import { Component } from 'angular2/core';
import { NavController } from 'ionic-angular';
import {Weather} from '../../components/weather/weather';

/*
  Generated class for the WeatherPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/weather/weather.html',
   directives: [Weather],
})
export class WeatherPage {
  constructor(private nav: NavController) {}
}
