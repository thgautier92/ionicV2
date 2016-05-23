import {Storage, LocalStorage} from 'ionic-angular';
import {Injectable, Pipe, PipeTransform} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import { FORM_DIRECTIVES, FormBuilder,Control, ControlGroup, Validators,AbstractControl } from 'angular2/common';
const mailFormat='/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i';
/*
  Generated class for the ParamsparamsForm provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Pipe({
  name: 'searchTab'
})
@Injectable()
export class MyFilterPipe implements PipeTransform {
  transform(items: any[], args: any[]): any {
    return items.filter(item => item.id.indexOf(args[0]) !== -1);
  }
}

@Injectable()
export class Paramsdata {
  local: any;
  keyStore: any;
  paramsForm: any = null;
  dataMenu: any = null;
  dataForms: any = null;
  fb:FormBuilder;
  constructor(public http: Http, fb:FormBuilder) {
    this.local = new Storage(LocalStorage);
    this.keyStore = "dataForms";
    this.fb=fb;
    this.dataForms=[];
  }
  loadMenu() {
    if (this.dataMenu) {
      // already loaded paramsForm
      return Promise.resolve(this.dataMenu);
    }
    // don't have the paramsForm yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the paramsForm,
      // then on the response it'll map the JSON paramsForm to a parsed JS object.
      // Next we process the paramsForm and resolve the promise with the new paramsForm.
      this.http.get('data/menus.json')
        .map(res => res.json())
        .subscribe(dataMenu => {
          // we've got back the raw paramsForm, now generate the core schedule paramsForm
          // and save the paramsForm for later reference
          this.dataMenu = dataMenu;
          resolve(this.dataMenu);
        });
    });
  }
  loadForm() {
    if (this.paramsForm) {
      // already loaded paramsForm
      return Promise.resolve(this.paramsForm);
    }
    // don't have the paramsForm yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the paramsForm,
      // then on the response it'll map the JSON paramsForm to a parsed JS object.
      // Next we process the paramsForm and resolve the promise with the new paramsForm.
      this.http.get('data/forms.json')
        .map(res => res.json())
        .subscribe(paramsForm => {
          // we've got back the raw paramsForm, now generate the core schedule paramsForm
          // and save the paramsForm for later reference
          this.paramsForm = paramsForm;
          resolve(this.paramsForm);
        });
    });
  }
  getForm(id) {
    console.log("Get form for id", id, this.paramsForm)
    return new Promise(resolve => {
      this.loadForm().then((data) => {
        //console.log("List forms:",data);
        if (data) {
          let ret = {};
          let form = data.forms.filter(item => item.id === id);
          console.log("Form find", form);
          if (form.length == 0) {
            form = data.forms.filter(item => item.id === 1);
          }
          ret['form'] = form[0];
          // Generate a Form Builder Group
          let group = {};
          form[0]['fields'].forEach(question => {
            question.value='';
            let lstValidator=[];
            lstValidator.push(question.value || '');
            if (question.required) lstValidator.push(Validators.required);
            if (question.type=='email') lstValidator.push(ValidationService.emailValidator);
            group[question.model] = lstValidator;
            //group['input_' + question.model] = question.required ? [question.value || '', Validators.required] : [question.value || ''];
          });
          ret['formGroup']=this.fb.group(group);
          resolve(ret);
        } else {
          resolve(null);
        }
      })
    });
  }
  /* -----
  * Methods for data store during forms input
  */
  initDataForms() {
    this.dataForms[0]={ ts: new Date()};
    this.local.set(this.keyStore, JSON.stringify(this.dataForms));
  }
  storeDataForms(id, data) {
    this.dataForms[id] = data;
    this.local.set(this.keyStore, JSON.stringify(this.dataForms));
  }
  getDataForms() {
    return JSON.parse(this.local.get(this.keyStore));
  }
}


// Specific validator for input
export class GlobalValidator{
    static mailFormat(control: Control): ValidationResult {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (control.value != "" && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return { "incorrectMailFormat": true };
        }
        return null;
    }
}
interface ValidationResult {
    [key: string]: boolean;
}
export class ValidationService {

  static getValidatorErrorMessage(code: string) {
    let config = {
      'required': 'Required',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.'
    };
    return config[code];
  }

  static creditCardValidator(control:any) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }
     
  static emailValidator(control:any) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
        return { 'invalidEmailAddress': true };
      }
    }
     
   static passwordValidator(control:any) {
     // {6,100}           - Assert password is between 6 and 100 characters
     // (?=.*[0-9])       - Assert a string has at least one number
     if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
       return null;
     } else {
       return { 'invalidPassword': true };
     }
  }
}
