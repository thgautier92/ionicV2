import {Page, NavController} from 'ionic-angular';
import {ValuesPipe} from '../../comon/pipes';
import {Paramsdata} from '../../../providers/params-data/params-data';
/*
  Generated class for the FormParamPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/complex-forms/form-param/form-param.html',
  providers: [Paramsdata],
  pipes: [ValuesPipe]
})
export class FormParamPage {
  dataForms: any;
  paramsApi: Paramsdata;
  constructor(public nav: NavController, paramsApi: Paramsdata) {
    this.paramsApi = paramsApi;
    this.paramsApi.loadForm().then((result) => {
      // handle result
      console.log("Forms params:", result);
      this.dataForms = result.forms;
      this
    }, (error) => {
      console.log("Error", error);
      this.dataForms = error;
    });
  }
}
