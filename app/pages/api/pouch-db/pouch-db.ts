import {Page, NavController} from 'ionic-angular';
import {ValuesPipe} from '../../comon/pipes';
import {PouchSynchroPage} from './pouch-synchro/pouch-synchro';
import {PouchEditPage} from './pouch-edit/pouch-edit';
import {PouchParamPage} from './pouch-param/pouch-param';
declare var PouchDB: any;
/*
  Generated class for the PouchDbPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/api/pouch-db/pouch-db.html',
  pipes: [ValuesPipe]
})
export class PouchDbPage {
  tab1: any;
  tab2: any;
  tab3: any;
  constructor(public nav: NavController) {
    this.tab1 = PouchSynchroPage;
    this.tab2 = PouchEditPage;
    this.tab3 = PouchParamPage;
  }
}