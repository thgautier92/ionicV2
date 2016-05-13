import {Page, NavController} from 'ionic-angular';
import {CrudPage} from './crud/crud';
import {SynchroPage} from './synchro/synchro';
import {ParamsPage} from './params/params';
/*
  Generated class for the CouchDbPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/api/couch-db/couch-db.html',
})
export class CouchDbPage {
  tab1:any;
  tab2:any;
  tab3:any;
  constructor(public nav: NavController) {
    this.tab1 = CrudPage;
    this.tab2 = SynchroPage;
    this.tab3 = ParamsPage;
  }
}
