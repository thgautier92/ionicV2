import {Component,Renderer} from 'angular2/core';
import {Platform, NavController,Slides} from 'ionic-angular';
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
  providers: [Renderer,Rss],
  directives : [IONIC_DIRECTIVES]
})
export class Feeds {
  news:Rss;
  text:any;
  posts:any;
  feeds:any;
  platform:any;
  lstFeeds:any = [];
  search:any = "";
  constructor(news:Rss, platform:Platform) {
    this.platform=platform;
    this.news=news;
    this.lstFeeds=[
      {"name":"Le monde à la UNE","url":"http://www.lemonde.fr/rss/une.xml"},
      {"name":"Le monde","url":"http://www.lemonde.fr/m-actu/rss_full.xml"},
      {"name":"JDN","url":"http://www.journaldunet.com/rss/"},
      {"name":"01.NET","url":"http://www.01net.com/rss/info/flux-rss/flux-toutes-les-actualites/"},
    ]; 
    this.search={selectedFeed:"",text:""};
  }
  refreshFeed(){
    console.log("Google Feed info => read");
    this.news.load().then((result) => {
      console.log(result);
      this.posts=result['responseData']['feed']['entries'];
      this.text = '';
    },(error) => {
      console.log("Feed Error =>",JSON.stringify(error));
      this.text = 'No News';
    });
  }
  getFeed(){
    console.log("Feed info => read");
    this.news.readSource(this.search.selectedFeed).then((result) => {
      //console.log(result);
      this.feeds=result['rss']['channel']['item'];
    },(error) => {
      console.log("Feed Error =>",JSON.stringify(error));
      this.text = 'No News';
    });
  }
  // Open the rss Link
  openLink(info){
    this.platform.ready().then(() => {
        window.open(info.link, "_system", "location=true");
    });
  };
}
