import {Page, NavController, NavParams} from 'ionic-angular';
import {MovieService} from './httpRequest.services';
 
@Page({
  templateUrl: 'build/pages/httpRequest/httpRequest.html',
  providers: [MovieService]
})
 
export class MovieListPage {
  movies:any;
  movieService:any;
  logError:any;
  constructor(private nav: NavController, movieService:MovieService) {
    this.nav = nav;
    this.movieService = movieService;
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
    this.nav.push(MovieInfo, {
      movie: movie
    });
  }
}

