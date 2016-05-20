import {Page, Platform, NavController, Storage, SqlStorage} from 'ionic-angular';
import {DisplayTools} from '../../../comon/display';

declare var PouchDB: any;
/*
  Generated class for the PouchSynchroPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/api/pouch-db/pouch-synchro/pouch-synchro.html',
  providers: [DisplayTools]
})
export class PouchSynchroPage {
  platform: any;
  srvInfo: any;
  store: Storage;
  db: any;
  remoteCouch: any;
  sync: any;
  syncExec: any;
  docs: any;
  params: any;
  display: DisplayTools;
  constructor(public nav: NavController, platform: Platform, display: DisplayTools) {
    this.platform = platform;
    this.display = display;
    this.sync = { "start": false, "info": false, "error": false };
    this.docs = [];
    this.params = {};
    this.store = new Storage(SqlStorage);
    this.store.get("pouchParam").then((data) => {
      let par = JSON.parse(data);
      if (par) {
        this.params = par;
        this.db = new PouchDB(this.params.base, { adapter: 'websql', iosDatabaseLocation: 'default' });
        this.remoteCouch = 'http://' + this.params.user + ':' + this.params.password + '@' + this.params.srv + '/' + this.params.base;
      } else {
        this.display.displayAlert("Paramètre incorrect. Veuillez les vérifier sur l'onglet");
      }
    });
  }
  showBase() {
    let me=this;
    this.db.allDocs({ include_docs: true, descending: true }, function (err, data) {
      console.log(err, data);
      me.docs = data.rows;
      console.log("==> Refresh list", data);
    });
  };
  // ===== Sync opérations =====
  startSync() {
    console.log("Start Sync");
    let me=this;
    this.sync.start = true;
    this.sync.error = false;
    var opts = { live: true };
    this.syncExec = PouchDB.sync(this.db, this.remoteCouch, opts)
      .on('change', function (info) {
        // handle change
        //console.log(info);
        me.sync.info = info;
        me.showBase();
      })
      .on('error', function (err) {
        console.log(err);
        me.sync.error = err
      })
      .on('complete', function (info) {
        // handle complete
        //console.log(info);
        me.sync.info = info;
        me.showBase();
      }).on('paused', function (err) {
        // replication paused (e.g. replication up to date, user went offline)
      }).on('active', function () {
        // replicate resumed (e.g. new changes replicating, user went back online)
      }).on('denied', function (err) {
        // a document failed to replicate (e.g. due to permissions)
      });
  };
  cancelSync() {
    this.syncExec.cancel();
    this.sync.start = false;
    console.log("End Sync");
  };
  delDb() {
    this.db.destroy().then(function (response) {
      // success
      console.log(response);
    }).catch(function (err) {
      console.log(err);
    });
  }
}
