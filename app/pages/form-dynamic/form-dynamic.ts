import {Page, NavController} from 'ionic-angular';
import {CORE_DIRECTIVES} from 'angular2/common';
import {FORM_DIRECTIVES} from 'angular2/common';
import {FormInput} from '../../components/form-input/form-input';

/*
FORM_BINDINGS, NgFormModel, ControlGroup, Control
  Generated class for the FormDynamicPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/form-dynamic/form-dynamic.html',
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, FormInput]
})
export class FormDynamicPage {
  data: Object;
  columns = [
    { name: "column1", display: "This is number only", visible: true, type: "number", length: "10" },
    { name: "column2", display: "This a text field", visible: true, type: "text", length: "10" },
    { name: "column3", display: "Column 3", visible: false, type: "text", length: "10" },
    { name: "column4", display: "Toggle and see", visible: true, type: "boolean" },
    { name: "column5", display: "Column 5", visible: true, type: "enum", values: ["Blue", "Yellow", "White"] }
  ];
  constructor(public nav: NavController) {
    this.data = { column1: "10", column3: "Not a secret", column4: false, column5: "Yellow" };
  }
  onSubmit(f) {
    console.log(this.data);
  }
  dataString() {
    return JSON.stringify(this.data, null, 2);
  }
  valueOf(obj) {
    if (obj !== undefined && obj !== null) return obj;
    else return "";
  }
}
