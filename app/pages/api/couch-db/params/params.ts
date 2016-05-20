import {Page, NavController} from 'ionic-angular';
import {DisplayTools} from '../../../comon/display';
import {CouchDb} from '../../../../providers/couch-db/couch-db';
/*
  Generated class for the ParamsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/api/couch-db/params/params.html',
  providers:[DisplayTools,CouchDb]
})
export class ParamsPage {
  srvInfo: any;
  db:CouchDb;
  params:any;
  display:DisplayTools;
  constructor(public nav: NavController, db:CouchDb, display:DisplayTools) {
    this.display=display;
    this.db = db;
    this.params = db.getParams();
    this.srvInfo = null;
  }
  srvTest() {
    console.log("Test server");
    let loading = this.display.displayLoading("Appel du serveur en cours");
    this.srvInfo = null;
    this.db.getDabases("",this.params).then((result) => {
      // handle result
      console.log("srvInfo:",result);
      this.srvInfo = result;
      loading.dismiss();
    },(error)=>{
      this.display.displayToast("Erreur de connexion au serveur");
      this.srvInfo=error;
      loading.dismiss();
    });
  }

}
