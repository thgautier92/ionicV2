import {Page, NavController, NavParams} from 'ionic-angular';
import {groupBy, ValuesPipe, KeysPipe} from '../../comon/pipes';
import { FORM_DIRECTIVES, 
  FormBuilder, ControlGroup, Validators, AbstractControl,
  NgSwitch,
  NgSwitchWhen,
  NgSwitchDefault } from 'angular2/common';
import {Paramsdata} from '../../../providers/params-data/params-data';
/*
  Generated class for the FormInputPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/complex-forms/form-input/form-input.html',
  providers: [Paramsdata],
  directives: [FORM_DIRECTIVES,NgSwitch, NgSwitchWhen, NgSwitchDefault],
  pipes: [groupBy, ValuesPipe, KeysPipe]
})
export class FormInputPage {
  selectedMenu: any;
  selectedForm: any = null;
  selectedFields: any = null;
  titleForm: any;
  paramsApi: Paramsdata;
  constructor(private nav: NavController, navParams: NavParams, paramsApi: Paramsdata) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedMenu = navParams.get('menu');
    console.log("Menu selected", this.selectedMenu);
    this.paramsApi = paramsApi;
    this.paramsApi.getForm(this.selectedMenu.form).then((data) => {
      this.selectedForm = data;
      this.selectedFields = new groupBy().transform(data['fields'], 'group');
      this.selectedMenu.status = "Started";
      //console.log(this.selectedForm);
      console.log("Form Fields, grouped", this.selectedFields);
    });

  }
  goStop() {
    this.selectedMenu.status = "Hold";
  }
  goPause() {
    this.selectedMenu.status = "Pending";
  }
  goNext() {
    this.selectedMenu.status = "Completed";
    this.paramsApi.getForm(this.selectedForm.id + 1).then((data) => {
      this.selectedForm = data;
    });

  }
}
