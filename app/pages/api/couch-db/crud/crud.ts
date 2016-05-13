import {Page, NavController} from 'ionic-angular';
import {CouchDb} from '../../../../providers/couch-db/couch-db';
/*
  Generated class for the CrudPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/api/couch-db/crud/crud.html',
  providers: [CouchDb]
})
export class CrudPage {
  db: any;
  listBases: any;
  listRange: any;
  consult: any;
  skip: any;
  baseDocs: any;
  doc: any;
  constructor(public nav: NavController, db: CouchDb) {
    this.db = db;
    this.consult = { "base": "", "range": 10 };
    this.listRange = [
      { "lib": "10", "opt": 10, },
      { "lib": "20", "opt": 20 },
      { "lib": "50", "opt": 50 },
      { "lib": "100", "opt": 100 }
    ];
    this.skip = 0;
    this.baseDocs = [];
    this.doc = {}
  }
  getBases() {
    this.db.getDabases('_all_dbs').then((result) => {
      // handle result
      console.log("lstBases:", result);
      this.listBases = result;
    }, (error) => {
      console.log("Error", error);
      this.listBases = null;
    });
  }
  getDocs(base, range) {
    if (!base) {
      base = "demo";
    }
    if (!range) {
      range = "10";
    }
    this.db.getDbDocs(base, range, this.skip).then((result) => {
      // handle result
      console.log(result);
      this.baseDocs = result;
      this.skip = Number(result.offset) + Number(range);
    }, (error) => {
      console.log(error);
      this.baseDocs = null;
    });
  }
  gotoStart(base, range) {
    this.skip = 0;
    this.getDocs(base, range);
  };
  changeDb(base, range) {
    this.skip = 0;
    this.getDocs(base, range);
  }
  getDocId(base, id) {
    if (!base) {
      base = "demo";
    }
    if (!id) {
      id = "";
    }
    this.doc = null;
    this.db.getDbDoc(base, id).then(function (result) {
      // handle result
      console.log(result);
      this.doc = result;
      //this.modal.show();

    }).catch(function (err) {
      console.log(err);
      this.doc = null;
    });

  };
};

