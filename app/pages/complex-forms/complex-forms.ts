import {Page, NavController} from 'ionic-angular';
import {Form1Page} from './form-1/form-1';
import {Form2Page} from './form-2/form-2';
import {Form3Page} from './form-3/form-3';
import {FormParamPage} from './form-param/form-param';
/*
  Generated class for the ComplexFormsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/complex-forms/complex-forms.html',
})
export class ComplexFormsPage {
  tab1:any;
  tab2:any;
  tab3:any;
  tab4:any;
  constructor(public nav: NavController) {
    this.tab1 = Form1Page;
    this.tab2 = Form2Page;
    this.tab3 = Form3Page;
    this.tab4 = FormParamPage;
  }
}
