import {Storage, LocalStorage} from 'ionic-angular';
import {Injectable,Pipe,PipeTransform} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

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
  local:any;
  keyStore:any;
  paramsForm: any = null;
  dataMenu: any = null;
  dataForms: any = null;

  constructor(public http: Http) {
    this.local = new Storage(LocalStorage);
    this.keyStore= "dataForms";
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
          let form=data.forms.filter(item => item.id === id);
          console.log("Form find",form);
          if (form.length==0) {
            form=data.forms.filter(item => item.id === 1);
          }
          resolve(form[0]);
        } else {
          resolve(null);
        }
      })
    });
  }
  /* -----
  * Methods for data store during forms input
  */
  initDataForms(){
    this.dataForms = {ts:new Date()};
    this.local.set(this.keyStore, JSON.stringify(this.dataForms));
  }
  storeDataForms(id,data){
    this.dataForms[id]=data;
    this.local.set(this.keyStore, JSON.stringify(this.dataForms));
  }
  getDataForms(){
    return JSON.parse(this.local.get(this.keyStore));
  }
}
