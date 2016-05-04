import {Page, NavController} from 'ionic-angular';
import {DisplayTools} from '../../comon/display';
import {DeviceMotion} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/device/motion/motion.html',
  providers: [DisplayTools]
})
export class MotionPage {
  display: DisplayTools;
  subscription: any;
  acc: any;
  pluginOk: boolean;
  record: boolean;
  constructor(public nav: NavController, display: DisplayTools) {
    this.display = display;
    this.pluginOk = false;
    this.record=false;
    this.getCurrent();
  }
  getCurrent() {
    DeviceMotion.getCurrentAcceleration().then(
      acceleration => {
        this.acc = acceleration;
        this.pluginOk = true;
      }
      , error => {
        this.display.displayToast(error);
        this.pluginOk = false;
      }
    );
  }
  startWatch() {
    // Watch device acceleration
    this.subscription = DeviceMotion.watchAcceleration().subscribe(acceleration => {
      this.record=true;
      console.log(acceleration);
      this.acc = acceleration;
      
    });
  }
  stoptWatch() {
    // Stop watch
    this.subscription.unsubscribe();
    this.record=false;
  }
}