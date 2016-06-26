import {Page, NavController} from 'ionic-angular';
import {DisplayTools} from '../../comon/display';
import {Geolocation} from 'ionic-native';
import {LaunchNavigator} from 'ionic-native';

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
  display: DisplayTools;
  geo: any;
  options:any;
  subscription: any;
  pluginOk: boolean;
  record: boolean;
  constructor(public nav: NavController, display: DisplayTools) {
    this.display = display;
    this.geo=null;
    this.options={ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
    this.pluginOk=false;
    this.record=false;
    this.getCurrent();
  }
  getCurrent() {
    let loading = this.display.displayLoading("Géolocalisation en cours...");
    Geolocation.getCurrentPosition(this.options).then((resp) => {
      console.log(resp);
      this.geo = resp;
      this.pluginOk=true;
      loading.dismiss();
    }, error => {
      this.pluginOk=false;
      this.display.displayAlert("Geolocalisation indisponible : "+JSON.stringify(error));
      loading.dismiss();
    });
  }
  startWatch() {
    this.subscription = Geolocation.watchPosition(this.options).subscribe(position => {
      this.record=true;
      console.log(position);
      this.geo = position;
    });
  }
  stopWatch() {
    // To stop notifications
    this.record=false;
    this.subscription.unsubscribe();
  }
  goDest(geo){
    let position=[geo.coords.latitude,geo.coords.longitude];
    LaunchNavigator.navigate(position).then(
    success => console.log("Launched navigator"),
    error => this.display.displayAlert("Error launching navigator : "+JSON.stringify(error))
  );
  }
}
