import {Page, Platform, NavController} from 'ionic-angular';
import {Toast} from 'ionic-angular';
import {Camera} from 'ionic-native';

/*
  Generated class for the CameraPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/media/camera/camera.html',
})
export class CameraPage {
  platform: any;
  cameraOpt: any;
  cameraSrc: any;
  options: any;
  onDevice: any;
  base64Image:any;

  constructor(public nav: NavController, platform: Platform) {
    this.platform = platform
    this.cameraSrc = "";
    this.cameraOpt = { quality: 50, allowEdit: true, saveToPhotoAlbum: false, correctOrientation: true };
    this.onDevice = this.platform.is('ios') || this.platform.is('android') || this.platform.is('windows');
  }

  getPhoto() {
    this.options = {
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 400,
      targetHeight: 400
    };
    this.options.quality = this.cameraOpt.quality;
    this.options.allowEdit = this.cameraOpt.allowEdit;
    this.options.saveToPhotoAlbum = this.cameraOpt.saveToPhotoAlbum;
    this.options.correctOrientation = this.cameraOpt.correctOrientation;
    console.log(this.onDevice);
    if (this.onDevice) {
      Camera.getPicture(this.options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.base64Image = "data:image/jpeg;base64," + imageData;
      }, (err) => {
        this.displayToast("Caméra erreur : "+err);
      });
    } else {
        this.displayToast("Caméra non disponible en mode WEB");
    }
  }
  displayToast(msg) {
    let toast = Toast.create({
      message: msg,
      duration: 3000,
      showCloseButton:true,
      closeButtonText:"Fermer"
    });

    toast.onDismiss(() => {
      //console.log('Dismissed toast');
    });
    this.nav.present(toast);
  }
}
