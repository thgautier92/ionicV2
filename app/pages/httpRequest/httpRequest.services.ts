import { Inject } from 'angular2/core';
import { Http } from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import 'rxjs/add/operator/map';
 
export class MovieService {  
    http:any;
    constructor(@Inject(Http) http: Http) {
        this.http = http
    }
    private _params = { "srv": "gautiersa.fr:81", "user": "tgautier", "password": "Tga051163", "base": "movies" };
    private _Url = 'http://'+this._params.srv+'/'+this._params.base;  // URL to web api
    searchMovies(movieName) {
        //var url = this._Url + encodeURI(movieName);
        let headers = new Headers({ 
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + window.btoa(this._params.user + ':' + this._params.password) 
        });
        let options = new RequestOptions({ headers: headers });
        var url = this._Url + '/_all_docs?include_docs=true';
        return this.http.get(url,options).map(res => res.json());
    };
    getServer() {
        return this._Url;
    }
}