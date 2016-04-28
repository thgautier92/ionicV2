import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/select/select.html'
})
export class SelectPage {
    gaming: string = "n64";
  gender: string = "f";
  musicAlertOpts: { title: string, subTitle: string };

  constructor() {
    this.musicAlertOpts = {
      title: '1994 Music',
      subTitle: 'Select your favorite'
    };
  }

  stpSelect() {
    console.log('STP selected');
  }
}
