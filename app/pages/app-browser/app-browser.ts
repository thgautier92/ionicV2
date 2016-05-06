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
  lstDest: any;
  dest: any;
  options: any;
  constructor(public nav: NavController) {
    this.lstUrl = [
      { "id": 1, "title": "Le Monde", "url": "http://www.lemonde.fr", "img": "img/logo_website.jpg" },
      { "id": 2, "title": "Jdnet", "url": "http://www.journaldunet.com/", "img": "img/logo_website.jpg" },
      { "id": 3, "title": "01.net", "url": "http://www.01net.com/", "img": "img/logo_website.jpg" }
    ];
    this.lstDest = [
      { "code": "_self", "lib": "Dans l'application" },
      { "code": "_blank", "lib": "Nouvelle fenetre" },
      { "code": "_system", "lib": "Navigateur Mobile" }
    ];
    this.dest = "_blank";
    this.options = {
      "location": "no",
      "clearcache": "no",
      "toolbar": "no"
    };
  }
  openUrl(url) {
    window.open(url, this.dest, this.options);
  };
}
