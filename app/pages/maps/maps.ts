import {Page, NavController} from 'ionic-angular';
import {GoogleAPI} from './gloader'
import {DisplayTools} from '../comon/display';


/*
  Generated class for the MapsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/maps/maps.html',
  providers: [GoogleAPI,DisplayTools]
})
export class MapsPage {
  display:any;
  gmap: any;
  map: any;
  gLoad: any;
  options: any;
  markerCurrentPos:any;
  constructor(public nav: NavController, gLoad: GoogleAPI, display:DisplayTools) {
    this.display = display;
    this.gLoad = gLoad;
    this.gmap = {
      params: { lat: 48.8534100, lng: 2.3488000 }
    };
    this.gLoad.mapLoad().then((mapApi) => {
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
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      mapTypeId: mapApi.maps.MapTypeId.ROADMAP
    }

    this.map = new mapApi.maps.Map(document.getElementById("map"), mapOptions);
    this.map.setTilt(45);
    //console.log(this.map);
  }
  centerLoc() {
    let loading = this.display.displayLoading("Géolocalisation en cours...");
    if (this.markerCurrentPos) {
      this.gLoad.mapRemoveMarker(this.markerCurrentPos);
    }
    this.gLoad.geoLocation().then((pos) => {
      //console.log("Position : ", pos);
      let p = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      this.gLoad.mapAddMarker(this.map, p, "Vous êtes ici").then((marker) => {
        console.log("Marker", marker);
        this.markerCurrentPos=marker;
        this.gLoad.mapCenter(this.map, p);
        loading.dismiss();
      });
    })
  }
}

