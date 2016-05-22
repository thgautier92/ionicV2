import {Loading, Toast, NavController} from 'ionic-angular';
import {Injectable} from 'angular2/core';

@Injectable()
export class DisplayTools {
    constructor(public nav: NavController) {
        this
        this.nav = nav;
    }
    displayLoading(msg, duration?) {
        if (!duration) duration = 5;
        let loading = Loading.create({ content: msg, duration: duration * 1000 });
        this.nav.present(loading);
        return loading;
    }
    displayToast(msg) {
        let toast = Toast.create({
            message: msg,
            duration: 2000,
            showCloseButton: true,
            closeButtonText: "Fermer",
            dismissOnPageChange: true
        });
        toast.onDismiss(() => {
            //console.log('Dismissed toast');
        });
        this.nav.present(toast);
    }
    displayAlert(msg) {
        console.log(msg);
        alert(msg);
    }
    displayJson(el, data) {

    }
    getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}