import {Page, NavController} from 'ionic-angular';
import {ValuesPipe} from '../../../comon/pipes';

declare var PouchDB: any;
/*
  Generated class for the PouchEditPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/api/pouch-db/pouch-edit/pouch-edit.html',
  pipes: [ValuesPipe]
})
export class PouchEditPage {
  db: any;
  rows: any;
  count: any;
  constructor(public nav: NavController) {
    this.db = new PouchDB('my_database');
    this.rows = {};
  } 
  addTodo(text) {
    var me = this;
    var todo = {
      _id: new Date().toISOString(),
      title: text,
      completed: false
    };
    this.db.put(todo, function callback(err, result) {
      if (!err) {
        console.log('Successfully posted a todo!');
      }
    });
  }
  showTodos(refresher) {
    var me = this;
    this.db.allDocs({ include_docs: true, descending: true }, function (err, docs) {
      //console.log(docs);
      me.rows = docs.rows;
      me.count = docs.total_rows;
      if (refresher) refresher.complete();
    });
  }
}
