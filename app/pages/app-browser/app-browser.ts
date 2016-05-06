import {Page, NavController} from 'ionic-angular';

/*
  Generated class for the AppBrowserPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/app-browser/app-browser.html',
})
export class AppBrowserPage {
  lstUrl: any;
  options: any;
  constructor(public nav: NavController) {
    this.lstUrl = [
      { "id": 1, "title": "Le Monde", "url": "http://www.lemonde.fr","img":"http://www.lemonde.fr//medias/web/76f5986997539210ea49c34b9a19a243/img/sprites/sprite.png"},
      { "id": 2, "title": "Jdnet", "url": "http://www.journaldunet.com/" },
      { "id": 3, "title": "01.net", "url": "http://www.01net.com/" }];
    this.options = {
      "location": "no",
      "clearcache": "no",
      "toolbar": "no"
    };
  }
  openUrl(url) {
    window.open(url, '_blank', this.options);
  };
}
