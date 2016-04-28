import {Platform, Page, ActionSheet, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/actionSheets/actionSheets.html'
})
export class ActionSheetsPage {
  selectedItem: any;
  icons: string[];
  images: string[];
  items: Array<{ title: string, note: string, icon: string, img: string, like: number }>;

  constructor(public platform: Platform, public nav: NavController, navParams: NavParams) { }
  openMenu() {
    let actionSheet = ActionSheet.create({
      title: 'Albums',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Play',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    this.nav.present(actionSheet);
  }

}
