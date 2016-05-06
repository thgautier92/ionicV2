import {Page, Platform, NavController} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';
import {DisplayTools} from '../comon/display'

@Page({
  templateUrl: 'build/pages/qr-code/qr-code.html',
  providers: [DisplayTools]
})
export class QrCodePage {
  platform: any;
  displayTools: any;
  barCode: any;
  url: any;
  barCodeVerif: any;
  barText: any;
  barCodeErr: any;
  constructor(public nav: NavController, platform: Platform, displayTools: DisplayTools) {
    this.platform = platform;
    this.displayTools = displayTools;
    this.barCode = {};
    this.url = "";
    this.barCodeVerif = {};
    this.barText = {};
    this.barCodeErr = null;
  }
  scanCode() {
    this.platform.ready().then((readySource) => {
      BarcodeScanner.scan().then((barcodeData) => {
        // Success! Barcode data is here
        this.barCode = barcodeData;
        if (this.barCode.text.indexOf('http') != -1) {
          console.log("URL Found.")
          this.url = this.barCode.text;
        } else {
          console.log("URL not Found.")
          this.url = "";
        }
      }, (err) => {
        // An error occurred
        this.barCode = {};
        this.url = "";
        this.barCodeErr = err;
        this.displayTools.displayToast(err);
      });
    });
  };
  openUrl(url) {
    window.open(url, '_system', 'location=yes');
  };
}
