import {Toast, NavController} from 'ionic-angular';
import {Injectable} from 'angular2/core';

@Injectable()
export class DisplayTools {
    constructor(private nav: NavController) {
        this.nav=nav;
     }
    displayToast(msg) {
        let toast = Toast.create({
            message: msg,
            duration: 3000,
            showCloseButton: true,
            closeButtonText: "Fermer"
        });
        toast.onDismiss(() => {
            //console.log('Dismissed toast');
        });
        this.nav.present(toast);
        //return new Promise((resolve, reject) => resolve(true));
    }
    displayAlert(msg) {
        console.log(msg);
        alert(msg);
    }
}