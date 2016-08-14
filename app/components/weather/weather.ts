import { Component } from 'angular2/core';
import {NavController, Loading} from 'ionic-angular';
import {WeatherService} from '../../providers/weather/weather';
import {groupBy} from '../../pipes/common'

/*
  Generated class for the Weather component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'weather',
  templateUrl: 'build/components/weather/weather.html',
  providers: [WeatherService],
  pipes: [groupBy]
})
export class Weather {
  search: any;
  lstOpt: any;
  dataW: any = null;
  dataMsg:any =null;
  constructor(private weather: WeatherService, private nav: NavController) {
    this.search = { "city": "Paris", "days": "current" };
    this.lstOpt = [
      { 'code': 'current', 'lib': 'Maintenant' },
      { 'code': 'city', 'lib': 'Maintenant, ville commençant par' },
      { 'code': '5days', 'lib': 'Prévisions à 5 jours' },
      { 'code': '16days', 'lib': 'Prévisions à 16 jours' }]
  }
  getWeather() {
    let loading = Loading.create({
      content: 'Actualisation des données Météo...'
    });
    this.nav.present(loading);
    this.dataMsg=null;
    this.dataW = null;
    this.weather.load(this.search.city, this.search.days).then(response => {
      console.log(response);
      if (response['cod']==200){
        this.dataW = response;
      } else {
        this.dataMsg="Aucune donnée météo pour '"+this.search.city+"'. Veuillez préciser la ville, avec au moins 3 caractères.";
      }
      
      loading.dismiss();
    }).catch(error => {
      console.log(error);
      loading.dismiss();
    })
  }
}
