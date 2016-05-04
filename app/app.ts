import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import * as demoPages from './pages/demo-pages/demo-pages';
import * as httpDemo from './pages/httpRequest/httpRequest';
import * as networkInfo from './pages/network/network';
import * as media from './pages/media/media';
import * as device from './pages/device/device';
import * as qrcode from './pages/qr-code/qr-code';


@App({
  templateUrl: 'build/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  // make HelloIonicPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    private app: IonicApp,
    private platform: Platform,
    private menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage , icon: 'home' },
      { title: 'Http', component: httpDemo.MovieListPage, icon: 'keypad' },
      { title: 'Network', component: networkInfo.networkPage, icon: 'wifi' },
      { title: 'Composants', component: demoPages.DemoPagesPage, icon: 'desktop' },
      { title: 'Media', component: media.MediaPage, icon: 'images' },
      { title: 'Device', component: device.DevicePage, icon: 'device' },
      { title: 'QrCode', component: qrcode.QrCodePage , icon: 'qr-scanner' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
