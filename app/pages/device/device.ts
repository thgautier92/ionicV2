import {Page, NavController} from 'ionic-angular';
import {DisplayTools} from '../comon/display'
import {MotionPage} from './motion/motion';
import {orientationPage} from './orientation/orientation';
import {geolocationPage} from './geolocation/geolocation';

/*
  Generated class for the DevicePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/device/device.html',
  providers: [DisplayTools]
})
export class DevicePage {
  items: any;
  display: any;
  constructor(public nav: NavController, display: DisplayTools) {
    this.nav = nav;
    this.display = display;
    this.items = [
      { 'title': 'Mouvements', 'icon': 'move', 'description': "Mesure des mouvements", 'link': MotionPage, 'color': this.display.getRandomColor() },
      { 'title': 'Boussole', 'icon': 'compass', 'description': "Détection de l'orientation", 'link': orientationPage, 'color': this.display.getRandomColor() },
      { 'title': 'Position', 'icon': 'locate', 'description': 'Géolocalisation', 'link': geolocationPage, 'color': this.display.getRandomColor() },
    ]
  }
  openNavDetailsPage(item) {
    this.nav.push(item.link);
  }
}
