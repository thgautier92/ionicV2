import {Page, NavController} from 'ionic-angular';
import {DisplayTools} from '../../../comon/display';

declare var WL: any;
declare var WLAuthorizationManager: any;
/*
  Generated class for the InfosPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/api/mfp-api/infos/infos.html',
  providers: [DisplayTools]
})
export class InfosPage {
  errorMsg: any;
  infoSrv: any;
  display:DisplayTools;
  constructor(public nav: NavController,display:DisplayTools) {
    this.infoSrv = "";
    this.errorMsg = "";
    this.display = display;
  }
  getToken() {
    //console.log("MFP => Test Server,get token");
    this.display.displayLoading("Accés au serveur Mobile First",1);
    let me = this;
    me.infoSrv="";
    WLAuthorizationManager.obtainAccessToken().then(function (token) {
      me.infoSrv = token['value'];
      //console.log("MFP => Token",JSON.stringify(token));
    }, function (error) {
      me.errorMsg = JSON.stringify(error);
      //alert("failure: "+JSON.stringify(error))
    });
  };
}
