import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

const defaultParams = { "srv": "gautiersa.fr:81", "user": "tgautier", "password": "Tga051163", "base": "demo" };

/*
  Generated class for the CouchDb provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CouchDb {
  dataBases: any = null;
  data: any = null;

  constructor(public http: Http) {}
  getDabases(key) {
    if (this.dataBases) {
      // already loaded data
      return Promise.resolve(this.dataBases);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      var rootUrl = 'http://' + params.srv + '/' + key;
      var options = {
          method: 'GET',
          cached: false,
          headers: {
              'Content-Type': 'application/json',
              "Accept": "application/json;charset=utf-8",
              'Authorization': 'Basic ' + window.btoa(params.user + ':' + params.password)
          },
          withCredentials: true,            
          contentType: "application/json; charset=utf-8",
          url: rootUrl
      }
      this.$http(options)
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
}

