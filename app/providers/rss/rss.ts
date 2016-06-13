import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

declare var X2JS: any;
/*
  Generated class for the Rss provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Rss {
  x2js:any;
  data: any = null;
  url: any = "";
  srvApi:any = "http://ajax.googleapis.com"; 
  gApi:any= "/ajax/services/feed/load?v=1.0&num=8&q=";
  feed: any = "https://news.google.fr/news?output=rss&num=8";
  constructor(public http: Http) {
    this.x2js = new X2JS();
  }

  load(search?) {
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      if (search) {
        this.feed = search;
      }
      this.url=this.srvApi+this.gApi+this.feed;
      if (!window['device']){
        console.log("Proxy CORS added for Web application");
        this.url="/gapi"+this.gApi+this.feed;    
      }
      this.http.get(this.url)
        .map(res => res.json())
        .subscribe(data => {
          //this.data = data;
          resolve(data);
        });
    });
  };
  searchFeeds(search?) {
    return new Promise(resolve => {
      if (!search) {
        search="le monde";
      }
      let f="https://ajax.googleapis.com/ajax/services/feed/find?v=1.0&q="+search;
      this.http.get(f)
        .map(res => res.json())
        .subscribe(data => {
          //this.data = data;
          resolve(data);
        });
    });
  };
  readSource(search?) {
    return new Promise(resolve => {
      if (!search) {
        if (!window['device']){
          search="/lemonde/rss/une.xml";    
        } else {
          search="http://www.lemonde.fr/rss/une.xml";
        }
      }
      this.http.get(search)
        .map(res => res)
        .subscribe(data => {
          //console.log(data);
          var dataJ = this.x2js.xml_str2json(data['_body']);
          //console.log("result json",dataJ);
          //this.data = data;
          resolve(dataJ);
        });
    });
  }
}

