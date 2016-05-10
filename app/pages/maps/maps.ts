import {Platform, Page, Modal, NavController, NavParams, ViewController} from 'ionic-angular';
import {GoogleAPI} from './gMap'
import {DisplayTools} from '../comon/display';

@Page({
  templateUrl: 'build/pages/maps/maps.html',
  providers: [GoogleAPI, DisplayTools]
})
export class MapsPage {
  display: any;
  gMap: GoogleAPI;
  mapDefault: any;
  map: any;
  markerCurrentPos: any;
  markerSearch: any;
  searchQuery: string;
  mapInfos: any;
  constructor(public nav: NavController, gMap: GoogleAPI, display: DisplayTools) {
    this.display = display;
    this.gMap = gMap;
    this.mapDefault = {
      params: { lat: 48.8534100, lng: 2.3488000 },
      search: "Paris"
    };
    this.searchQuery = this.mapDefault.search;
    this.mapInfos = this.gMap.getMapInfoDef();
    this.gMap.mapLoad().then((mapApi) => {
      //console.log('Map API Loaded', mapApi);
      this.initMap(mapApi);
    })
  };
  // Init the map from a DIV element, identify by "map" id
  initMap(mapApi) {
    let latLng = new mapApi.maps.LatLng(this.mapDefault.params.lat, this.mapDefault.params.lng);
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
  }
  // Add a marker on the current localisation
  centerLoc() {
    let loading = this.display.displayLoading("Géolocalisation en cours...");
    if (this.markerCurrentPos) {
      this.gMap.mapRemoveMarker(this.markerCurrentPos);
    }
    this.gMap.geoLocation().then((pos: any) => {
      //console.log("Position : ", pos);
      let p = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      this.gMap.mapAddMarker(this.map, p, "Vous êtes ici").then((marker) => {
        console.log("Marker", marker);
        this.markerCurrentPos = marker;
        this.gMap.mapCenter(this.map, p);
        loading.dismiss();
      });
    })
  }
  searchAddress() {
    if (this.searchQuery.length >= 3) {
      if (this.markerSearch) {
        this.gMap.mapRemoveMarker(this.markerSearch);
      }
      this.gMap.geoCode(this.map, this.searchQuery).then((marker) => {
        this.markerSearch = marker;
      }, (reason) => {
        this.display.displayToast('Aucune correspondance trouvée. Code ' + reason);
      });
    }
  }
  displayInfo(idx) {
    this.mapInfos[idx].display = !this.mapInfos[idx].display;
    this.gMap.mapInfo(this.map, this.mapInfos).then((infos) => {
      //console.log(infos);
      this.mapInfos = infos;
    });
  }
  openOptions() {
    let modal = Modal.create(mapOptionsPage, this.mapInfos);
    modal.onDismiss(data => {
      this.mapInfos = data;
      this.gMap.mapInfo(this.map, this.mapInfos).then((infos) => {
        this.mapInfos = infos;
      });
    });
    this.nav.present(modal);
  }
  openDirections() {
    //this.nav.push(mapDirectionsPage, this.gMap);

    let modal = Modal.create(mapDirectionsPage, this.gMap);
    modal.onDismiss(data => {
      this.mapInfos = data;
      this.gMap.mapInfo(this.map, this.mapInfos).then((infos) => {
        this.mapInfos = infos;
      });
    });
    this.nav.present(modal);

  }
}


@Page({
  templateUrl: 'build/pages/maps/mapOptions.html',
})
class mapOptionsPage {
  mapOptions: any;
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    console.log(params);
    this.mapOptions = this.params.data;
  }
  dismiss() {
    this.viewCtrl.dismiss(this.mapOptions);
  }
}
/* ============================================= 
*  Map Directions
*
*/
@Page({
  templateUrl: 'build/pages/maps/mapDirections.html',
})
class mapDirectionsPage {
  mapData: any;
  dirOptions: any;
  dir: any;
  gMap: GoogleAPI;
  map: any;
  directionsService: any;
  directionsDisplay: any;
  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {
    // console.log(params);
    this.gMap = this.params.data;
    this.map = {};
    this.dirOptions = this.gMap.getDirectionsDef();
    this.dir = { "origin": "", "destination": "", "travelMode": "DRIVING" };
    this.directionsService = new window['google'].maps.DirectionsService();
    let directionsDisplay = new window['google'].maps.DirectionsRenderer();
  }
  onPageLoaded() {
    this.gMap.createMap("mapDirections").then((map) => {
      this.map = map;
    });
  }
  onPageWillLeave() { }
  dismiss() {
    this.viewCtrl.dismiss(this.mapData);
  }
  calcRoute() {
    var request = {
      origin: this.dir.origin,
      destination: this.dir.destination,
      travelMode: window['google'].maps.TravelMode.DRIVING
    };
    this.directionsDisplay.setMap(this.map);
    this.directionsService.route(request, function (result, status) {
      if (status == window['google'].maps.DirectionsStatus.OK) {
        console.log(result);
        this.directionsDisplay.setDirections(result);
      }
    });
  }
}