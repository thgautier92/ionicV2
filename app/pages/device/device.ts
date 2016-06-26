import {Page, NavController} from 'ionic-angular';
import {DisplayTools} from '../comon/display'
import {MotionPage} from './motion/motion';
import {orientationPage} from './orientation/orientation';
import {geolocationPage} from './geolocation/geolocation';
import {smsPage} from './sms/sms';
import {dbMeterPage} from './dbMeter/dbMeter';

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
      { 'title': 'SMS', 'icon': 'send', 'description': 'Envoi de SMS', 'link': smsPage, 'color': this.display.getRandomColor() },
      { 'title': 'Decibel', 'icon': 'microphone', 'description': 'Mesure de décibel', 'link': dbMeterPage, 'color': this.display.getRandomColor() },
    ]
  }
  openNavDetailsPage(item) {
    this.nav.push(item.link);
  }
}
