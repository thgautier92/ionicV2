import {Page, Loading, Modal, Platform, NavController, NavParams, ViewController,
  Storage, SqlStorage, LocalStorage} from 'ionic-angular';
import {DisplayTools} from '../../../comon/display';
import {PouchParamPage} from '../pouch-param/pouch-param';

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
    this.docs = [];
    this.params = {};
    this.store = new Storage(LocalStorage);
    this.loadBase();
  }

  loadBase() {
    this.sync = { "start": false, "info": false, "error": false, "stats": false, "timer": false };
    this.store.get("pouchParam").then((data) => {
      let par = JSON.parse(data);
      if (par) {
        this.display.displayLoading("Activation de la base " + par.base,1);
        this.params = par;
        this.db = new PouchDB(this.params.base);
        this.remoteCouch = 'http://' + this.params.user + ':' + this.params.password + '@' + this.params.srv + '/' + this.params.base;
        this.docs = [];
      } else {
        this.display.displayAlert("Paramètre incorrect. Veuillez les vérifier sur l'onglet");
      }
    }, error =>{});
  };

  showBase() {
    let me = this;
    me.docs = [];
    this.db.allDocs({ include_docs: true, descending: true }, function (err, data) {
      me.docs = data;
      //console.log("==> Refresh list", data);
    });
  };
  // ===== Sync opérations =====
  startSync() {
    console.log("Start Sync");
    let me = this;
    this.sync.start = true;
    this.sync.info = false;
    this.sync.error = false;
    this.sync.stats = false;
    this.sync.timer = false;
    var opts = { live: false, retry: true };
    this.syncExec = PouchDB.sync(this.db, this.remoteCouch, opts)
      .on('change', function (info) {
        // handle change
        me.sync.info = info;
        //me.showBase();
      })
      .on('error', function (err) {
        console.log(err);
        me.sync.error = err
        me.display.displayAlert(err);
      })
      .on('complete', function (info) {
        // handle complete
        console.log("Sync completed : ", info);
        me.sync.stats = info;
        me.sync.start = false;
        me.sync.timer = {
          "pull": (info.pull.end_time - info.pull.start_time),
          "push": (info.push.end_time - info.push.start_time)
        };
        me.openModal();
        me.showBase();
      }).on('paused', function (err) {
        // replication paused (e.g. replication up to date, user went offline)
        me.display.displayToast("Synchronisation en pause");
      }).on('active', function () {
        // replicate resumed (e.g. new changes replicating, user went back online)
        me.display.displayToast("Synchronisation active");
      }).on('denied', function (err) {
        // a document failed to replicate (e.g. due to permissions)
        me.display.displayAlert("Synchronisation refusée");
      });
  };
  cancelSync() {
    this.syncExec.cancel();
    this.sync.start = false;
    console.log("End Sync");
  };
  getSyncDetail() {
    this.openModal();
  }
  delDb() {
    let me = this;
    this.db.destroy().then(function (response) {
      console.log("Del DB", response);
      me.display.displayToast("Base effacée en local.");
      me.loadBase();
    }).catch(function (err) {
      console.log(err);
    });
  }
  openModal() {
    let modal = Modal.create(statSynchroModal, { infos: this.sync.stats });
    this.nav.present(modal);
  }
}
// ========== Modal for displaying sync results ==========
@Page({
  templateUrl: "build/pages/api/pouch-db/pouch-synchro/pouch-stats.html"
})
class statSynchroModal {
  infos: any;
  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {
    this.viewCtrl = viewCtrl;
    this.infos = this.params.get('infos');
  }
  close() {
    this.viewCtrl.dismiss();
  }
}
