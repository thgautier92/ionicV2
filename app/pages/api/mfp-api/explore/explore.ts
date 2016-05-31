import {Page, NavController} from 'ionic-angular';
declare var WL: any;
declare var WLAuthorizationManager:any; 
/*
  Generated class for the ExplorePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/api/mfp-api/explore/explore.html',
})
export class ExplorePage {
  constructor(public nav: NavController) {}
  getToken() {
    WLAuthorizationManager.obtainAccessToken().then(function(token) {
        alert("success: "+JSON.stringify(token))
    },function(error) {
        alert("failure: "+JSON.stringify(error))
    });
};
}

