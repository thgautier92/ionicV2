import {Page, NavController} from 'ionic-angular';
import {DisplayTools} from '../../comon/display';
import {DBMeter} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/device/dbMeter/dbMeter.html',
  providers: [DisplayTools]
})
export class dbMeterPage {
  display: DisplayTools;
  dbMeter: any;
  dbData:any;
  record:any;
  pluginOk: boolean;
  constructor(public nav: NavController, display: DisplayTools) {
    this.display = display;
    this.dbMeter = null;
    this.dbData = null;
    this.pluginOk=true;
    this.record=false;
    this.getCurrent();
  }
  getCurrent() {
    this.startListen();
    this.dbMeter.unsubscribe();
  }
  startListen() {
    // Watch decibel 
    this.dbMeter = DBMeter.start().subscribe(
        data => {
          console.log("DB meter value",data);
          this.dbData=data;
          this.record=true;
          this.dbMeter.unsubscribe();
        },
        error => {
          this.display.displayAlert("Error launching DBMeter : "+JSON.stringify(error));
          this.dbMeter.unsubscribe();
        }
    );
  }
  stopListen() {
    // Stop watch
    this.record=false;
    this.dbMeter.unsubscribe();
    DBMeter.delete().then(
      () => console.log("Deleted DB Meter instance"),
      error => this.display.displayAlert("Error occurred while deleting DB Meter instance")
    );
  }
}