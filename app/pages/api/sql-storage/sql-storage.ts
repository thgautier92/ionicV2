import {Page, Platform, Storage, SqlStorage, NavController} from 'ionic-angular';
import {ValuesPipe} from '../../comon/pipes';

/*
  Generated class for the SqlStoragePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/api/sql-storage/sql-storage.html',
  pipes: [ValuesPipe]
})
export class SqlStoragePage {
  platform: any;
  storage: any;
  datbase:any;
  items: any;
  count:any;
  constructor(public nav: NavController, platform: Platform) {
    this.platform = platform;
    this.initializeDB();
  }
  initializeDB() {
    this.platform.ready().then(() => {
      this.storage = new Storage(SqlStorage);
      this.storage.set('TS', new Date());
      this.storage.query('CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)').then((data) => {
        console.log("TABLE CREATED -> ",data);
        this.refresh();
      }, (error) => {
        console.log("ERROR -> ",error);
      });
    });
  }
  add() {
    this.platform.ready().then(() => {
      this.storage.query("INSERT INTO people (firstname, lastname) VALUES ('Nic', 'Raboy')").then((data) => {
        //console.log(data);
        this.refresh();
      }, (error) => {
        console.log("ERROR -> ",error);
      });
    });
  }
  delRecord(key) {
    this.platform.ready().then(() => {
      this.storage.query("DELETE FROM people WHERE id="+key).then((data) => {
        console.log(data);
        this.refresh();
      }, (error) => {
        console.log("ERROR -> ",error);
      });
    });
  }
  refresh() {
    this.platform.ready().then(() => {
      this.storage.query("SELECT * FROM people").then((data) => {
        console.log("Select :", data);
        this.items = data.res.rows;
        this.count = data.res.rows.length;
      }, (error) => {
        console.log("ERROR -> " + JSON.stringify(error.err));
      });
    });
  }
  resetDB() {
    this.platform.ready().then(() => {
      this.storage.clear();
    })
  }
}
