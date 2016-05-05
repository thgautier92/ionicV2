import {Page, NavController} from 'ionic-angular';
import {DisplayTools} from '../../comon/display';
import {DeviceOrientation} from 'ionic-native';


@Page({
  templateUrl: 'build/pages/device/orientation/orientation.html',
  providers: [DisplayTools]
})
export class orientationPage {
  display: DisplayTools;
  orient: any;
  options: any;
  subscription: any;
  pluginOk: boolean;
  record: boolean;
  constructor(public nav: NavController, display: DisplayTools) {
    this.display = display;
    this.orient = null;
    this.options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
    this.pluginOk = false;
    this.record = false;
    this.getCurrent();
  }
  getCurrent() {
    let loading = this.display.displayLoading("Calcul en cours...");
    DeviceOrientation.getCurrentHeading().then(
      data => {
        //console.log(data);
        this.orient = data;
        this.pluginOk = true;
        loading.dismiss();
      },
      error => {
        console.log(error);
        this.pluginOk = false;
        this.display.displayToast(error);
      }
    );
  }
  startWatch() {
    this.record = true;
    this.subscription = DeviceOrientation.watchHeading().subscribe(
      data => {
        this.orient = data;
      }
    );
  }
  stopWatch() {
    this.record = false;
    this.subscription.unsubscribe();
  }
}
