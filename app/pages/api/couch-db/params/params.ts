import {Page, NavController} from 'ionic-angular';
import {CouchDb} from '../../../../providers/couch-db/couch-db';
/*
  Generated class for the ParamsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/api/couch-db/params/params.html',
  providers:[CouchDb]
})
export class ParamsPage {
  srvInfo: any;
  db:CouchDb;
  params:any;
  constructor(public nav: NavController, db:CouchDb) {
    this.db = db;
    this.params = db.getParams();
    this.srvInfo = null;
  }
  srvTest() {
    console.log("Test server");
    this.srvInfo = null;
    this.db.getDabases("").then((result) => {
      // handle result
      console.log("srvInfo:",result);
      this.srvInfo = result;
    },(error)=>{
      console.log("Error",error);
      this.srvInfo=error;
    });
  }

}
