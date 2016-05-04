import {Page, NavController} from 'ionic-angular';
import {DisplayTools} from '../../comon/display';
import {Geolocation} from 'ionic-native';

/*
  Generated class for the MotionPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/device/geolocation/geolocation.html',
  providers: [DisplayTools]
})
export class geolocationPage {
  display: any;
  geo: any;
  subscription: any;
  constructor(public nav: NavController, display: DisplayTools) {
    this.display = display;
    this.geo=null;
    Geolocation.getCurrentPosition().then((resp) => {
      //resp.coords.latitude
      //resp.coords.longitude
      console.log(resp);
      this.geo = resp;
    }, error => this.display.displayToast(error));
  }
  startWatch() {
    this.subscription = Geolocation.watchPosition().subscribe(position => {
      console.log(position.coords.longitude + ' ' + position.coords.latitude);
    });
  }
  stopWatch() {
    // To stop notifications
    this.subscription.unsubscribe();
  }
}
