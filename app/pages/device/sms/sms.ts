import {Page, NavController} from 'ionic-angular';
import {DisplayTools} from '../../comon/display';
import {SMS} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/device/sms/sms.html',
  providers: [DisplayTools]
})
export class smsPage {
  display: DisplayTools;
  sms: any;
  options:any;
  pluginOk: boolean;
  constructor(public nav: NavController, display: DisplayTools) {
    this.display = display;
    this.pluginOk=true;
    this.sms={tel:'0699216805',msg:"Message de test"}
  }
  sendSms() {
    try {
      SMS.send(this.sms.tel,this.sms.msg);
    } catch(e){
      this.display.displayToast("Fonction non disponible en mode WEB");
    }
 } 
}