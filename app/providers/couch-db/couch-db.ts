import {Injectable} from 'angular2/core';
import {HTTP_PROVIDERS, Http, Request, RequestMethod, Headers} from 'angular2/http';
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
  credHeaders: Headers;
  constructor(public http: Http) {
    this.credHeaders = new Headers();
    this.credHeaders.append('Content-Type', 'application/json');
    this.credHeaders.append('Authorization', 'Basic ' + window.btoa(defaultParams.user + ':' + defaultParams.password));
    this.credHeaders.append('Accept', 'application/json;charset=utf-8');
  }

  getParams() {
    return defaultParams;
  }
  getDabases(key) {
    if (this.dataBases) {
      // already loaded data
      return Promise.resolve(this.dataBases);
    }
    // don't have the data yet
    return new Promise(resolve => {
      var rootUrl = 'http://' + defaultParams.srv + '/' + key;
      var options = new Request({
        method: RequestMethod.Get,
        headers: this.credHeaders,
        url: rootUrl
      });
      this.http.request(options)
        .map(res => res.json())
        .subscribe(
        data => {
          this.dataBases = data;
          resolve(this.dataBases);
        }, error => {
          console.log("Request error");
          resolve(JSON.parse(error._body));
        });
    });
  }
  getDbDocs(base, range, skip) {
    return new Promise(resolve => {
      var rootUrl = 'http://' + defaultParams.srv + '/' + base + '/_all_docs?include_docs=true&limit=' + range + '&skip=' + skip;
      console.log("Get server info : " + rootUrl);
      var options = new Request({
        method: RequestMethod.Get,
        headers: this.credHeaders,
        url: rootUrl
      });
      this.http.request(options)
        .map(res => res.json())
        .subscribe(
        data => {
          this.dataBases = data;
          resolve(this.dataBases);
        }, error => {
          console.log("Request error");
          resolve(JSON.parse(error._body));
        });
    });
  }
  getDbDoc(base, id) {
    return new Promise(resolve => {
      var rootUrl = 'http://' + defaultParams.srv + '/' + base + '/' + id;
      console.log("Get server info : " + rootUrl);
      var options = new Request({
        method: RequestMethod.Get,
        headers: this.credHeaders,
        url: rootUrl
      });
      this.http.request(options)
        .map(res => res.json())
        .subscribe(
        data => {
          this.dataBases = data;
          resolve(this.dataBases);
        }, error => {
          console.log("Request error");
          resolve(JSON.parse(error._body));
        });
    })
  }
}

