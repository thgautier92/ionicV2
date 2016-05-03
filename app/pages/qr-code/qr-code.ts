import {Page, Platform, NavController} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/qr-code/qr-code.html',
})
export class QrCodePage {
  platform:any;
  barCode:any;
  url:any;
  barCodeVerif:any;
  barText:any;
  barCodeErr:any;
  constructor(public nav: NavController, platform: Platform) {
    this.platform = platform;
    this.barCode = {}; 
    this.url = "";
    this.barCodeVerif = {};
    this.barText = {};
    this.barCodeErr = null;
  }
  scanCode () {
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
        });
      });
  };
  openUrl (url) {
      window.open(url, '_system', 'location=yes');
  };
}
