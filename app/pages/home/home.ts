import {Page, Platform} from 'ionic-angular';
import {Feeds} from '../../components/feeds/feeds';


@Page({
  templateUrl: 'build/pages/home/home.html',
  directives: [Feeds],
})
export class HomePage {
  items = []
  platform:any;
  constructor(platform: Platform) {
    this.platform = platform;  
    this.items = [
      { title: 'Ionic', version: '2.0 beta 30', icon: 'ionicV2.png', description: 'Nouvelle beta version', link: 'http://ionicframework.com/docs/v2/' },
      { title: 'Angular', version: '2.0', icon: 'angularV2.png', description: 'Version validée', link: 'https://angular.io/' },
      { title: 'Cordova', version: '6.2', icon: 'cordova_bot.png', description: 'Nouvelle version', link: 'https://cordova.apache.org/' }
    ]
  }
  openLink(item) {
    this.platform.ready().then(() => {
            window.open(item.link, "_system", "location=true");
        });
  }
  openNews(){
    //this.nav.push(ExplorePage);
  }
}
