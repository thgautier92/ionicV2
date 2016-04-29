import {Page, NavController, NavParams} from 'ionic-angular';
import {MovieService} from './httpRequest.services';
 import {Component, Pipe, PipeTransform, OnInit} from 'angular2/core';

@Pipe({name: 'values'})
export class ValuesPipe implements PipeTransform {
    transform(value: any, args?: any[]): Object[] {
        let keyArr = Object.keys(value),
            dataArr = [],
            keyName = args[0];

        keyArr.forEach(key => {
            value[key][keyName] = key;
            dataArr.push(value[key])
        });

        if(args[1]) {
            dataArr.sort((a: Object, b: Object): number => {
                return a[keyName] > b[keyName] ? 1 : -1;
            });
        }

        return dataArr;
    }
}
@Pipe({name: 'binaryData'})
export class binaryData {
  // Transform is the new "return function(value, args)" in Angular 1.x
  transform(value, mime?) {
    var temp=value.substring(4,value.length-1);
    console.log(temp,mime[0]);
    var file = new Blob([value], { type: mime[0] });
    var retUrl = URL.createObjectURL(file);
    console.log(retUrl);
    return file
  }
}
 
@Page({
  templateUrl: 'build/pages/httpRequest/httpRequest.html',
  providers: [MovieService],
  pipes: [ValuesPipe,binaryData]
})
export class MovieListPage {
  movies:any;
  urlSrv:string;
  movieService:any;
  logError:any;
  constructor(private nav: NavController, movieService:MovieService) {
    this.nav = nav;
    this.movieService = movieService;
    this.urlSrv = movieService.getServer();
  }
 
  searchMovieDB(event, key) {
    if(event.target.value.length > 2) {
      this.movieService.searchMovies(event.target.value).subscribe(
        data => {this.movies = data.rows; console.log(data);},
        err => console.log(err),
        () => console.log('Movie Search Complete')
      );
    }
  } 
 
  itemTapped(event, movie) {
    
  }
}

