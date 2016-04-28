import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/card/card.html'
})
export class CardPage {
  selectedItem: any;
  icons: string[];
  images: string[];
  items: Array<{title: string, note: string, icon: string, img: string, like:number}>;

  constructor(private nav: NavController, navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];
    this.images = ['ico.png', 'appicon.png', 'ico2.png'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Card ' + i,
        note: 'This is card #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)],
        img: this.images[Math.floor(Math.random() * this.images.length)],
        like: Math.floor(Math.random() * 100)
      });
    }
  }
}
