import {NavController, Page} from 'ionic-angular';
import {ExplorePage} from './explore/explore';
import {InfosPage} from './infos/infos';
import {loggerPage} from './logger/logger';
import {ParamsPage} from './params/params';


@Page({
  templateUrl: 'build/pages/api/mfp-api/mfp-api.html'
})
export class MfpApiPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  constructor(public nav: NavController) {
    // set the root pages for each tab
    this.tab1Root = ExplorePage;
    this.tab2Root = InfosPage;
    this.tab3Root = loggerPage;
    this.tab4Root = ParamsPage;

  }
}
