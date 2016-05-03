import {Page, NavController} from 'ionic-angular';
import {ImagePicker} from 'ionic-native';

/*
  Generated class for the ImagePickerPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/media/image-picker/image-picker.html',
})
export class ImagePickerPage {
  options: any;
  images:any;
  constructor(public nav: NavController) {
    this.options = {
      // max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 15,

      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 1024,
      height: 1024,

      // quality of resized image, defaults to 100
      quality: 100
    };
    ImagePicker.getPictures(this.options).then((results) => {
      this.images=results;
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => {
    });
  }
}
