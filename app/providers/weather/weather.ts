import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Weather provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WeatherService {
  data: any;
  rootUrl:any = "http://gautiersa.fr/apps/api/v2/web/meteo/owm/"
  constructor(private http: Http) {
    this.data = null;
  }

  load(city?,days?) {
    let api="city,current,5days,16days";
    if (!city) {
      city='Paris';
    }
    if (!days || api.indexOf(days) < 0) {
      days='current';
    }
    let url=this.rootUrl+days+'?q='+city;
    if (days=='16days') url=url+'&ctn=16';    
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get(url)
        .map(res => res.json())
        .subscribe(response => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = response.data.output;
          resolve(this.data);
        });
    });
  }
}

