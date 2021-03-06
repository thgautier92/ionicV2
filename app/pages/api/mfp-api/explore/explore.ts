import {Page, Platform, NavController,Slides} from 'ionic-angular';
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
  dataSql:any;
  itemsRss:any;
  pubDate:any;
  slideOptions:any;
  display:DisplayTools;
  platform:any;
  constructor(public nav: NavController,display:DisplayTools, plateform:Platform) {
    this.platform = plateform;
    this.display = display;
    this.infoSrv = "";
    this.dataSql = null;
    this.dataRss = null;
    this.itemsRss = null;
    this.pubDate=null;
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
        console.log("MFP => RSS return");
        console.log(response);
        me.dataRss = response.responseJSON;
        me.pubDate = response.responseJSON.rss.channel.pubDate;
        me.itemsRss=response.responseJSON.rss.channel.item;
      },
      function (error) {
        alert("failure: "+JSON.stringify(error));
        me.errorMsg = JSON.stringify(error);
      }
    );
  };
  getSql() {
    this.display.displayLoading("Lecture Sql",1);
    let me = this;
    let request = new WLResourceRequest("adapters/apiSql/getAll", WLResourceRequest.GET);
    request.setQueryParameter("params", "['clients', 10]");
    request.send().then(
      function (response) {
        console.log("MFP => SQL return",JSON.stringify(response));
        me.dataSql=response.responseJSON.resultSet;
      },
      function (error) {
        alert("failure: "+JSON.stringify(error));
        me.errorMsg = JSON.stringify(error);
      }
    );
  };
  // Open the rss Link
  openLink(info){
    this.platform.ready().then(() => {
        window.open(info.link, "_system", "location=true");
    });
  };
}

