import {Loading, Toast, NavController} from 'ionic-angular';
import {Injectable} from 'angular2/core';

@Injectable()
export class DisplayTools {
    constructor(private nav: NavController) {
        this.nav = nav;  
    }
    displayLoading(msg) {
        let loading = Loading.create({
            content: msg,
            duration: 5000
        });
        this.nav.present(loading);
        return loading;
        
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
    }
    displayAlert(msg) {
        console.log(msg);
        alert(msg);
    }
    displayJson(el,data){
        
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