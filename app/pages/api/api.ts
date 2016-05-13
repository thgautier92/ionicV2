import {Page, NavController} from 'ionic-angular';
import {CouchDbPage} from './couch-db/couch-db'
import {DisplayTools} from '../comon/display'

/*
  Generated class for the ApiPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/api/api.html',
  providers:[DisplayTools]
})
export class ApiPage {
  items: any;
  display: any;
  constructor(public nav: NavController, display: DisplayTools) {
    this.nav = nav;
    this.display = display;
    this.items = [
      { 'title': 'CouchDB', 'icon': 'cloud', 'description': "Base NoSQL", 'link': CouchDbPage, 'color': this.display.getRandomColor() },

    ]
  }
  openNavDetailsPage(item) {
    this.nav.push(item.link);
  }
}