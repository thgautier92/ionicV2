import {Page, NavController} from 'ionic-angular';
import {DisplayTools} from '../comon/display';
import {CouchDbPage} from './couch-db/couch-db';
import {PouchDbPage} from './pouch-db/pouch-db';
import {SqlStoragePage} from './sql-storage/sql-storage';
import {MfpApiPage} from './mfp-api/mfp-api';


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
      { 'title': 'CouchDB', 'icon': 'cloud', 'description': "Stockage NoSQL", 'link': CouchDbPage, 'color': this.display.getRandomColor() },
      { 'title': 'PouchDB', 'icon': 'cloud-download', 'description': "Stockage NoSQL local synchronisé avec CouchDB", 'link': PouchDbPage, 'color': this.display.getRandomColor() },
      { 'title': 'Sql Storage', 'icon': 'albums', 'description': "Stockage de données locales en mode SQL", 'link': SqlStoragePage, 'color': this.display.getRandomColor() },
      { 'title': 'Mobile First', 'icon': 'albums', 'description': "Api Mobile First", 'link': MfpApiPage, 'color': this.display.getRandomColor() },
    ]
  }
  openNavDetailsPage(item) {
    this.nav.push(item.link);
  }
}