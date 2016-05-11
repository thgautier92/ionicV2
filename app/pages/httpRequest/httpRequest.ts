import {Page, NavController, NavParams} from 'ionic-angular';
import {MovieService} from './httpRequest.services';
import {ValuesPipe,binaryData} from '../comon/pipes'

@Page({
  templateUrl: 'build/pages/httpRequest/httpRequest.html',
  providers: [MovieService],
  pipes: [ValuesPipe, binaryData]
})
export class MovieListPage {
  movies: any;
  urlSrv: string;
  movieService: any;
  logError: any;
  constructor(private nav: NavController, movieService: MovieService) {
    this.nav = nav;
    this.movieService = movieService;
    this.urlSrv = movieService.getServer();
  }

  searchMovieDB(event, key) {
    console.log(event,key);
    if (event.target.value.length > 2) {
      this.movieService.searchMovies(event.target.value).subscribe(
        data => { this.movies = data.rows; console.log(data); },
        err => console.log(err),
        () => console.log('Movie Search Complete')
      );
    }
  }

  itemTapped(event, movie) {

  }
}

