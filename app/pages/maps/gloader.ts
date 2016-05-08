//const url = 'https://apis.google.com/js/client.js?onload=__onGoogleLoaded'
const gmapKey = 'AIzaSyDsfocxKIufTQdkZ7lXe-bgYThcXF2jkZY'
const gmapUrl = 'https://maps.googleapis.com/maps/api/js?key='+gmapKey+'&callback=__onGoogleLoaded'


export class GoogleAPI {
  loadAPI: Promise<any>
  map: any;
  constructor() {
    this.loadAPI = new Promise((resolve) => {
      window['__onGoogleLoaded'] = (ev) => {
        console.log('Google Api loaded')
        resolve(window.google);
      }
      this.loadScript()
    });

  }
  loadMap() {
    return this.loadAPI.then((map) => {
      return map;
    });
  }

  loadScript() {
    console.log('Loading Google API...')
    let node = document.createElement('script');
    node.src = gmapUrl;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}