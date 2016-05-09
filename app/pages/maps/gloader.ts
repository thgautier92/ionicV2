import {Geolocation} from 'ionic-native';
import {Injectable} from 'angular2/core';
//const url = 'https://apis.google.com/js/client.js?onload=__onGoogleLoaded'
const gmapKey = 'AIzaSyDsfocxKIufTQdkZ7lXe-bgYThcXF2jkZY'
const gmapUrl = 'https://maps.googleapis.com/maps/api/js?key=' + gmapKey + '&callback=__onGoogleLoaded'

@Injectable()
export class GoogleAPI {
  loadAPI: Promise<any>
  map: any;
  optionsGeoLoc: any;
  defaultLoc: any;
  currentLoc: any;
  constructor() {
    this.loadAPI = new Promise((resolve) => {
      window['__onGoogleLoaded'] = (ev) => {
        console.log('Google Api loaded')
        resolve(window.google);
      }
      this.loadScript()
    });
    this.optionsGeoLoc = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
    this.defaultLoc = { lat: 48.8534100, lng: 2.3488000 };
    this.map = null;

  }
  loadScript() {
    console.log('Loading Google API...')
    let node = document.createElement('script');
    node.src = gmapUrl;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  mapLoad() {
    return this.loadAPI.then((map) => {
      return map;
    });
  }
  geoLocation() {
    return new Promise((resolve) => {
      Geolocation.getCurrentPosition(this.optionsGeoLoc).then((resp) => {
        //console.log(resp);
        this.currentLoc = resp;
        resolve(this.currentLoc);
      }, error => {
        this.currentLoc = this.defaultLoc;
        resolve(this.currentLoc);
      });

    });
  }
  mapCenter(map, pos) {
    // pos format : {lat:xxx,lng:yyy}
    //console.log("Center to the position", pos, map);
    map.setCenter(pos);
  }
  mapAddMarker(map, pos, markerText) {
    var image = {url: 'img/mapPositionPin.png',size:null,origin:null,anchor:null};
      //image.size= new google.maps.Size(20,32);
      //image.origin= new google.maps.Point(0, 0);
      //image.anchor= new google.maps.Point(0, 5);
      //icon: image,animation: google.maps.Animation.BOUNCE,
    return new Promise((resolve) => {
      let marker = new google.maps.Marker({
        position: pos,     
        map: map,
        draggable: true
      })
      let infowindow = new google.maps.InfoWindow({
        content: markerText,
      });
      marker.addListener('click', function () {
        marker.setAnimation(null);
        infowindow.open(map, marker);
      });
      resolve(marker);
    });
  }
  mapRemoveMarker(marker) {
    marker.setMap(null);
  }

}