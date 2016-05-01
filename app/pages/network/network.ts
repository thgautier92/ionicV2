import {Page, Platform} from 'ionic-angular';
import {Device, Network, Connection} from 'ionic-native';
//import {Component, Pipe, PipeTransform, OnInit} from 'angular2/core';
import {ValuesPipe} from '../comon/pipes'


@Page({
  templateUrl: 'build/pages/network/network.html',
  pipes: [ValuesPipe]
})
export class networkPage {
    platform:any;
    onDevice:Boolean;
    deviceInfo:any;
    netInfo:any;
    states:any;
  constructor(platform: Platform) {
    this.platform = platform;  
    this.netInfo={};
    this.deviceInfo={};
    this.states = [];
    this.states[Connection.UNKNOWN]  = 'Unknown connection';
    this.states[Connection.ETHERNET] = 'Ethernet connection';
    this.states[Connection.WIFI]     = 'WiFi connection';
    this.states[Connection.CELL_2G]  = 'Cell 2G connection';
    this.states[Connection.CELL_3G]  = 'Cell 3G connection';
    this.states[Connection.CELL_4G]  = 'Cell 4G connection';
    this.states[Connection.CELL]     = 'Cell generic connection';
    this.states[Connection.NONE]     = 'No network connection';
    
    this.platform.ready().then((readySource) => {
      this.onDevice = this.platform.is('ios') || this.platform.is('android') || this.platform.is('windows');
      this.deviceInfo = Device.device;
      console.log(this.deviceInfo);
      this.checkNetwork();
    });
    
    
    
    
    // watch network for a disconnect
    let disconnectSubscription = Network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-( ')
      this.checkNetwork();
    });
    let connectSubscription = Network.onConnect().subscribe(() => {
      console.log('network connected!');
       this.checkNetwork();
    });
  }
  checkNetwork() {
    this.platform.ready().then((readySource) => {
        //console.log(navigator,readySource);
        if (this.onDevice) {
          this.netInfo.type = Network.connection;
          this.netInfo.isOffline=false;
          this.netInfo.isOnline=true;
        } else {
            this.netInfo.type="Inconnu";
            this.netInfo.isOffline=!navigator.onLine;
            this.netInfo.isOnline=navigator.onLine;
        }
    });
  }  
}