import {Page, NavController} from 'ionic-angular';
import {ValuesPipe} from '../../comon/pipes';
import {Paramsdata} from '../../../providers/params-data/params-data';
import {FormInputPage} from '../form-input/form-input';

/*
  Generated class for the Form1Page page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/complex-forms/form-1/form-1.html',
  providers: [Paramsdata],
  pipes: [ValuesPipe]

})
export class Form1Page {
  dataMenu: any;
  store: Storage;
  paramsApi: Paramsdata;
  constructor(public nav: NavController, paramsApi: Paramsdata) {
    this.paramsApi = paramsApi;
    this.paramsApi.loadMenu().then((result) => {
      //console.log("Forms params:", result);
      this.dataMenu = result;
      this.paramsApi.initDataForms();
    }, (error) => {
      console.log("Error", error);
      this.dataMenu = null;
    });
  }
  itemTapped(item) {
    //console.log("Navigation:", item);
    this.nav.push(FormInputPage, { menu: item.value });
  }
}
