import {Page, NavController} from 'ionic-angular';
import {DisplayTools} from '../../../comon/display';

declare var WL: any;
/*
  Generated class for the loggerPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  Level : ['trace', 'debug', 'log', 'info', 'warn', 'error', 'fatal']
*/
@Page({
  templateUrl: 'build/pages/api/mfp-api/logger/logger.html',
  providers: [DisplayTools]
})
export class loggerPage {
  log: any;
  display: DisplayTools;
  status: any;

  constructor(public nav: NavController, display: DisplayTools) {
    this.display = display;
    this.status = null;
    WL.Logger.config({
      level: [],
      pretty: true
    });
    this.log = WL.Logger.create();
  }
  startLog() {
    this.display.displayLoading("Génération de trace à plusieurs niveaux", 1);
    this.log.trace('trace', 'Start logging on local device');
    this.log.debug('debug', [1, 2, 3], { hello: 'world' });
    this.log.log('log', 'another message');
    this.log.info('info', 1, 2, 3);
    this.log.warn('warn', undefined);
    this.log.error('error', new Error('oh no'));
    //this.log.fatal('fatal', 'another message');

    
  }
  statusLog() {
    let me = this;
    WL.Logger.status()
      .then(function (state) {
        //{ enabled : true, stringify: true, filters : {},
        // level : 'info', pkg : '', tag: {level: false, pkg: true} }
        console.log("MFP-Logger status");
        console.log(state);
        me.status = state;
      })
      .fail(function (errMsg) {
        //errMsg = error message
        me.status = errMsg;
      });
  }
  analyticLog(){
    WL.Analytics.log({ data: [1, 2, 3] }, 'IonicV2 Data');
    WL.Analytics.send().then(function () {
      //nop
    })
    .fail(function (errObj) {
        //errObj.src = function that failed
        //errObj.res = error message
      });
  }
}
