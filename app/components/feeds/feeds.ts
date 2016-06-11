import {Component} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';
import {Rss} from '../../providers/rss/rss';
/*
  Generated class for the Feeds component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'feeds',
  templateUrl: 'build/components/feeds/feeds.html',
  providers: [IONIC_DIRECTIVES,Rss]
})
export class Feeds {
  news:Rss;
  text:any;
  posts:any;
  constructor(news:Rss) {
    this.news=news;    
  }
  refreshFeed(){
    this.news.load().then((result) => {
      //console.log(result);
      this.posts=result.responseData.feed.entries;
      this.text = '';
    },(error) => {
      console.log(error);
      this.text = 'No News';
    });
  }
}
