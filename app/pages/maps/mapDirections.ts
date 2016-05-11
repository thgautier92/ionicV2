import {Platform, Page, Modal, NavController, NavParams, ViewController} from 'ionic-angular';
import {GoogleAPI} from './gMap'
import {DisplayTools} from '../comon/display';

@Page({
    templateUrl: 'build/pages/maps/mapDirections.html',
    providers: [GoogleAPI, DisplayTools]
})
export class mapDirectionsPage {
    display: DisplayTools;
    mapData: any;
    dirOptions: any;
    dir: any;
    gMap: GoogleAPI;
    map: any;
    directionsService: any;
    directionsDisplay: any;
    okInstructions: Boolean;
    directionsInfos: any;
    constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController, display: DisplayTools) {
        // console.log(params);
        this.gMap = this.params.data;
        this.display = display;
        this.map = {};
        this.dirOptions = this.gMap.getDirectionsDef();
        this.dir = { "origin": "", "destination": "", "travelMode": this.dirOptions.travelMode[0].type };
        this.directionsService = {};
        this.directionsDisplay = {};
        this.directionsInfos = {};
        this.okInstructions = false;
    }
    onPageLoaded() {
        let loading = this.display.displayLoading("Géolocalisation en cours...");
        navigator.geolocation.getCurrentPosition((position) => {
            let latLng = new window['google'].maps.LatLng(position.coords.latitude, position.coords.longitude);
            let mapOptions = {
                center: latLng,
                zoom: 7,
                mapTypeId: window['google'].maps.MapTypeId.ROADMAP
            }
            this.map = new window['google'].maps.Map(document.getElementById("mapDirections"), mapOptions);
            this.directionsService = new window['google'].maps.DirectionsService();
            this.directionsDisplay = new window['google'].maps.DirectionsRenderer();
            this.directionsDisplay.setMap(this.map);
            loading.dismiss();
        }, (error) => {
            console.log(error);
        });
    }
    onPageWillLeave() { }
    dismiss() {
        this.viewCtrl.dismiss(this.mapData);
    }
    calcRoute() {
        var me = this;
        me.okInstructions = false;
        var request = {
            origin: this.dir.origin,
            destination: this.dir.destination,
            travelMode: this.dir.travelMode
        };
        this.directionsService.route(request, function (result, status) {
            if (status == window['google'].maps.DirectionsStatus.OK) {
                console.log(result);
                me.directionsDisplay.setDirections(result);
                me.directionsInfos = result.routes[0].legs[0];
                me.directionsDisplay.setPanel(document.getElementById('mapInstructions'));
                me.okInstructions = true;
            } else {
                me.okInstructions = false;
            }
        });
    }
    setOriginToCenter() {
        let loading = this.display.displayLoading("Géolocalisation en cours...");
        navigator.geolocation.getCurrentPosition((position) => {
            this.dir.origin = position.coords.latitude + ',' + position.coords.longitude;
            loading.dismiss();
        });
    }
    setDestinationToCenter() {
        let loading = this.display.displayLoading("Géolocalisation en cours...");
        navigator.geolocation.getCurrentPosition((position) => {
            this.dir.destination = position.coords.latitude + ',' + position.coords.longitude;
            loading.dismiss();
        });
    }
}