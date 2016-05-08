import {Page, NavController} from 'ionic-angular';
import {GoogleAPI} from './gloader'

/*
  Generated class for the MapsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/maps/maps.html',
  providers: [GoogleAPI]
})
export class MapsPage {
  gmap: any;
  map: any;
  gLoad: any;
  constructor(public nav: NavController, gLoad: GoogleAPI) {
    this.gLoad = gLoad;
    this.gmap = {
      params: { lat: 48.8534100, lng: 2.3488000 }
    };
    gLoad.loadMap().then((mapApi) => {
      console.log('Map API Loaded', mapApi);
      this.initMap(mapApi);
    })

  };
  initMap(mapApi) {
    let latLng = new mapApi.maps.LatLng(this.gmap.params.lat, this.gmap.params.lng);
    console.log(latLng);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: mapApi.maps.MapTypeId.ROADMAP
    }

    this.map = new mapApi.maps.Map(document.getElementById("map"), mapOptions);
    console.log(this.map);
  }
}

