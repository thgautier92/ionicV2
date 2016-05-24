import {Page, NavController} from 'ionic-angular';
import {Paramsdata} from '../../../providers/params-data/params-data';

/*
  Generated class for the Form2Page page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/complex-forms/form-2/form-2.html',
})
export class Form2Page {
  formData:any;
  paramApi:Paramsdata;
  constructor(public nav: NavController,paramApi:Paramsdata) {
    this.paramApi=paramApi;
    this.formData=[]
    this.getData();
  }
  getData(){
    this.formData=this.paramApi.getDataForms()
  }
}
