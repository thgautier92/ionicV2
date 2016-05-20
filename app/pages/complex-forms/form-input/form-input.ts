import {Page, NavController, NavParams} from 'ionic-angular';
import {groupBy, ValuesPipe, KeysPipe} from '../../comon/pipes';
import { FORM_DIRECTIVES,
  NgForm,FormBuilder, Control, ControlGroup, Validators, AbstractControl,
  NgSwitch, NgSwitchWhen, NgSwitchDefault } from 'angular2/common';
import {Paramsdata} from '../../../providers/params-data/params-data';
/*
  Generated class for the FormInputPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/complex-forms/form-input/form-input.html',
  providers: [Paramsdata],
  directives: [FORM_DIRECTIVES, NgSwitch, NgSwitchWhen, NgSwitchDefault],
  pipes: [groupBy, ValuesPipe, KeysPipe]
})
export class FormInputPage {
  selectedMenu: any;
  selectedForm: any = null;
  selectedFields: any = null;
  titleForm: any;
  paramsApi: Paramsdata;
  myForm: ControlGroup;
  form:ControlGroup;
  fb:FormBuilder;
  constructor(private nav: NavController, navParams: NavParams, paramsApi: Paramsdata, fb:FormBuilder) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedMenu = navParams.get('menu');
    console.log("Menu selected", this.selectedMenu);
    this.paramsApi = paramsApi;
    this.fb=fb;
    this.form=this.fb.group({});
    this.loadForm(this.selectedMenu['form']);
  }
  loadForm(id) {
    this.paramsApi.getForm(id).then((data) => {
      console.log("Get form data ",id,data);
      this.selectedForm = data['form'];
      this.form=data['formGroup'];
      // Group fields array
      this.selectedFields = new groupBy().transform(this.selectedForm['fields'], 'group');
      this.selectedMenu.status = "Started";
    });
  }
  goStop() {
    this.selectedMenu.status = "Hold";
  }
  goPause() {
    this.selectedMenu.status = "Pending";
    console.log(this.form);
  }
  goNext() {
    this.selectedMenu.status = "Completed";
    this.loadForm(this.selectedForm.id + 1);
  }
  initField(model) {
    
  }
  onSubmit(){}
}


