import {Page, NavController} from 'ionic-angular';
import {DisplayTools} from '../../comon/display'


@Page({
  templateUrl: 'build/pages/device/orientation/orientation.html',
  providers: [DisplayTools]
})
export class orientationPage {
  display:any;
  constructor(public nav: NavController, display:DisplayTools) {
    this.display=display;
  }
}
