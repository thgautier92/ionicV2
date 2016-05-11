import {Geolocation} from 'ionic-native';
import {Injectable} from 'angular2/core';

const gmapKey = 'AIzaSyDsfocxKIufTQdkZ7lXe-bgYThcXF2jkZY'
const gmapUrl = 'https://maps.googleapis.com/maps/api/js?key=' + gmapKey + '&callback=__onGoogleLoaded&libraries=visualization'

@Injectable()
export class GoogleAPI {
  loadAPI: Promise<any>;
  map: any;
  optionsGeoLoc: any;
  defaultLoc: any;
  currentLoc: any;
  googleApi: any;
  constructor() {
    this.loadAPI = new Promise((resolve) => {
      window['__onGoogleLoaded'] = (ev) => {
        console.log('gloader : Google Api loaded.');
        this.googleApi = window['google'],
          resolve(this.googleApi);
      }
      this.loadScript();
    });
    this.optionsGeoLoc = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
    this.defaultLoc = { lat: 48.8534100, lng: 2.3488000 };
  }
  // Maps methods
  loadScript() {
    console.log('gloader : loading Google API...')
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
  createMap(elId) {
    return new Promise((resolve) => {
      var ville = new window['google'].maps.LatLng(this.defaultLoc.lat, this.defaultLoc.lng);
      var mapOptions = {
        zoom: 7, 
        center: ville, 
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        mapTypeId: window['google'].maps.MapTypeId.ROADMAP
      }
      var mapId = new window['google'].maps.Map(document.getElementById(elId), mapOptions);
      console.log("Map created : ", mapId);
      resolve(mapId);
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
    var image = { url: 'img/mapPositionPin.png', size: null, origin: null, anchor: null };
    //image.size= new google.maps.Size(20,32);
    //image.origin= new google.maps.Point(0, 0);
    //image.anchor= new google.maps.Point(0, 5);
    //icon: image,animation: google.maps.Animation.BOUNCE,
    return new Promise((resolve) => {
      let marker = new this.googleApi.maps.Marker({
        position: pos,
        map: map,
        draggable: true
      })
      let infowindow = new this.googleApi.maps.InfoWindow({
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
  geoCode(map, address) {
    return new Promise((resolve, reject) => {
      let infowindow = new window['google'].maps.InfoWindow;
      let geocoder = new this.googleApi.maps.Geocoder();
      geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == window['google'].maps.GeocoderStatus.OK) {
          //console.log("Results", results);
          map.setCenter(results[0].geometry.location);
          var marker = new window['google'].maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
          resolve(marker);
        } else {
          //alert("Geocode was not successful for the following reason: " + status);
          reject(status);
        }
      });
    });
  }
  getMapInfoDef() {
    return [
      { type: "trafic", lib: "Trafic", display: false, layer: null },
      { type: "transit", lib: "Transports", display: false, layer: null },
      { type: "bike", lib: "Pistes Cyclables", display: false, layer: null }
    ];
  }
  getDirectionsDef() {
    return {
      travelMode: [
        { type: window['google'].maps.TravelMode.DRIVING, lib: "Voiture", icon: "car" },
        { type: window['google'].maps.TravelMode.BICYCLING, lib: "Vélo", icon: "bike" },
        { type: window['google'].maps.TravelMode.TRANSIT, lib: "Transports", icon: "train" },
        { type: window['google'].maps.TravelMode.WALKING, lib: "A pied", icon: "" }
      ]
    };
  }
  mapInfo(map, infos) {
    return new Promise((resolve) => {
      infos.forEach(element => {
        //console.log(element);
        switch (element.type) {
          case 'trafic':
            if (element.display) {
              var trafficLayer = new window['google'].maps.TrafficLayer();
              trafficLayer.setMap(map);
              element.layer = trafficLayer;
            } else {
              if (element.layer) {
                element.layer.setMap(null);
              }
            }
            break;
          case 'transit':
            if (element.display) {
              var transitLayer = new window['google'].maps.TransitLayer();
              transitLayer.setMap(map);
              element.layer = transitLayer;
            } else {
              if (element.layer) {
                element.layer.setMap(null);
              }
            }
            break;
          case 'bike':
            if (element.display) {
              var bikeLayer = new window['google'].maps.BicyclingLayer();
              bikeLayer.setMap(map);
              element.layer = bikeLayer;
            } else {
              if (element.layer) {
                element.layer.setMap(null);
              }
            }
            break;
        }
      });
      resolve(infos);
    });
  }
}