import {Page, NavController} from 'ionic-angular';
import {DisplayTools} from '../../comon/display';
import {DeviceMotion} from 'ionic-native';

/*
  Generated class for the MotionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/device/motion/motion.html',
  providers: [DisplayTools]
})
export class MotionPage {
  display: any;
  subscription: any;
  acc: any;
  constructor(public nav: NavController, display: DisplayTools) {
    this.display = display;
    DeviceMotion.getCurrentAcceleration().then(
      acceleration => this.acc = acceleration,
      error => this.display.displayToast(error)
    );
  }
  startWatch() {
    // Watch device acceleration
    this.subscription = DeviceMotion.watchAcceleration().subscribe(acceleration => {
      console.log(acceleration);
      this.acc = acceleration;
    });
  }
  stoptWatch() {
    // Stop watch
    this.subscription.unsubscribe();
  }
}
