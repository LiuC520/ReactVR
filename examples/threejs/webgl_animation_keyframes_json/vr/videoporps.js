
import { Module} from 'react-vr-web';

export class MyVideoModule extends Module{
  constructor(){
    super('MyVideoModule')
    this.videoElement=null
    this.bufferedLength = 0;
  }

  setAttribute(){
    this.videoElement= document.getElementsByTagName('video')[0]
    this.videoElement.setAttribute('autoplay','autoplay');
    this.videoElement.setAttribute('x-webkit-airplay','true');
    this.videoElement.setAttribute('webkit-playsinline','true');
    this.videoElement.setAttribute('playsinline','true');
    this.videoElement.setAttribute('preload','auto');
    this.videoElement.setAttribute('poster','../static_assets/loading.gif');
  }  
  getBuffered(){
    this.bufferedLength = this.videoElement.buffered.length
    return this.bufferedLength
  }
  getReadyState(){
    return this.videoElement.readyState
  }
}