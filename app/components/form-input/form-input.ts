import {Component,Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {FORM_DIRECTIVES, FORM_BINDINGS, NgFormModel, ControlGroup, Control, Validators} from 'angular2/common';

@Component({
  selector: 'df-question',
  properties: ['column', 'rowData'],
  directives: [FORM_DIRECTIVES,CORE_DIRECTIVES],
  bindings: [FORM_BINDINGS],
  templateUrl: 'build/components/form-input/form-input.html'
})
export class FormInput {
  column: Object;
  rowData: Object;
  htmlElementType:string;
  @Input() form:ControlGroup;
  constructor() { }
  
  onInit(){
    this.htmlElementType = this.computeHtmlElementType();
  }

  computeHtmlElementType(): string {
    if (this.column['type'] == "boolean") {
      return "checkbox";
    } else if (this.column['type'] == "enum") {
      return "option";
    } else if (this.column['type'] == "text" || this.column['type'] == "email" || this.column['type'] == "number"){
      return "input"
    } else {
      return "unknown"
    }
  }
  
  computeInputSubType(){
    if(this.column['type'] == "text"){
      return "text";
    } else if(this.column['type'] == "email"){
      return "email";
    } else if( this.column['type'] == "number"){
      return "number";
    } else {
      return "text";
    }
  }
}