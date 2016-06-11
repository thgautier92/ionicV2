import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Rss provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Rss {
  data: any = null;
  url: any = "http://news.google.fr/news?cf=all&hl=fr&pz=1&ned=fr&output=rss";
  srvApi:any = "http://ajax.googleapis.com"; 
  api:any= "/ajax/services/feed/load?v=1.0&num=8&q=";
  feed: any = "https://news.google.fr/news?output=rss&num=20";
  constructor(public http: Http) {
    this.url=this.srvApi+this.api+this.feed;
    if (!window['device']){
        console.log("Proxy CORS added for Web application");
        this.url="/gapi"+this.api+this.feed;    
    }
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
      this.http.get(this.url)
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

