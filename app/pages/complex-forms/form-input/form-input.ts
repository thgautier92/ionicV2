import {Page, NavController, NavParams} from 'ionic-angular';
import {Paramsdata} from '../../../providers/params-data/params-data';
/*
  Generated class for the FormInputPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/complex-forms/form-input/form-input.html',
  providers: [Paramsdata]
})
export class FormInputPage {
  selectedForm: any;
  titleForm: any;
  paramsApi: Paramsdata;
  constructor(private nav: NavController, navParams: NavParams, paramsApi: Paramsdata) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedForm = navParams.get('form');
    this.paramsApi = paramsApi;

    console.log(this.selectedForm);
  }
  goStop() { }
  goPause() { }
  goNext() {
    this.paramsApi.getForm(this.selectedForm.id+1).then((data)=>{
      console.log(data);
      this.selectedForm=data;
    });

  }
}
