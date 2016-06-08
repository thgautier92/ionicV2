import {Page, NavController,Slides} from 'ionic-angular';
import {DisplayTools} from '../../../comon/display';

declare var WL: any;
declare var WLAuthorizationManager: any;
declare var WLResourceRequest: any;
/*
  Generated class for the ExplorePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/api/mfp-api/explore/explore.html',
  providers: [DisplayTools]
})
export class ExplorePage {
  errorMsg: any;
  infoSrv: any;
  dataRss: any;
  items:any;
  slideOptions:any;
  display:DisplayTools;
  constructor(public nav: NavController,display:DisplayTools) {
    this.display = display;
    this.infoSrv = "";
    this.dataRss = null;
    this.items = null;
    this.errorMsg = "";
    this.slideOptions = {
      initialSlide: 1,
      loop: true
    };
  }
  next() {

  };
  getSrvUrl() {
    this.display.displayLoading("Interrogation du serveur Mobile First",1);
    let me = this;
    me.infoSrv="";
    WL.App.getServerUrl(function(response){
      me.infoSrv=response;
    }, function(error){
      me.errorMsg = JSON.stringify(error);
    });
  };
  getAdapt() {
    this.display.displayLoading("Lecture RSS",1);
    let me = this;
    let request = new WLResourceRequest("adapters/rss/getFeed", WLResourceRequest.GET);
    request.send().then(
      function (response) {
        me.dataRss = response;
        me.items=response.rss.chanel.item
        console.log("MFP => RSS return",response);
      },
      function (error) {
        alert("failure: "+JSON.stringify(error));
        me.errorMsg = JSON.stringify(error);
      }
    );

  }
}

