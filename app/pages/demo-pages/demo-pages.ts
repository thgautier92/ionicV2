import {NavController,NavParams} from 'ionic-angular';
import {Page} from 'ionic-angular';
import {ListPage} from './list/list';
import {CardPage} from './card/card';
import {ActionSheetsPage} from './actionSheets/actionSheets';
import {SelectPage} from './select/select';
import * as slides from './slides/slides';
import * as toolbar from './toolbar/toolbar';
import * as inputs from './inputs/inputs';


@Page({
  templateUrl: 'build/pages/demo-pages/demo-pages.html',
})

export class DemoPagesPage {
  items = [];
  constructor(public nav: NavController) {
    this.nav = nav;
    this.items = [
      {'title': 'Liste','icon': 'list','description': 'Liste','link': ListPage,'color': this.getRandomColor()},
      {'title': 'Card','icon': 'card','description': 'Card','link': CardPage,'color': this.getRandomColor()},
      {'title': 'Action Sheets','icon': 'magnet','description': 'Actions','link': ActionSheetsPage,'color': this.getRandomColor()},
      {'title': 'Select','icon': 'ios-arrow-dropdown','description': 'Select','link': SelectPage,'color': this.getRandomColor()},
      {'title': 'Slides','icon': 'albums','description': 'Slides','link': slides.SlidesPage,'color': this.getRandomColor()},
      {'title': 'Bar search','icon': 'search','description': 'Tools Bar Searc','link': toolbar.SearchbarPage,'color': this.getRandomColor()},
      {'title': 'Bar segment','icon': 'options','description': 'Tools Bar Segment','link': toolbar.SegmentPage,'color': this.getRandomColor()},
      {'title': 'Inputs','icon': 'keypad','description': 'Formulaires','link': inputs.InsetPage,'color': this.getRandomColor()},
      ]
  }
  openNavDetailsPage(item) {
   this.nav.push(item.link);
  }
  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
}

