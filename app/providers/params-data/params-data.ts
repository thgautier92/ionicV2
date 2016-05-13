import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ParamsdataForm provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Paramsdata {
  dataForm: any = null;

  constructor(public http: Http) {}

  loadForm() {
    if (this.dataForm) {
      // already loaded dataForm
      return Promise.resolve(this.dataForm);
    }

    // don't have the dataForm yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the dataForm,
      // then on the response it'll map the JSON dataForm to a parsed JS object.
      // Next we process the dataForm and resolve the promise with the new dataForm.
      this.http.get('data/forms.json')
        .map(res => res.json())
        .subscribe(dataForm => {
          // we've got back the raw dataForm, now generate the core schedule dataForm
          // and save the dataForm for later reference
          this.dataForm = dataForm;
          resolve(this.dataForm);
        });
    });
  }
}

