
import { Module} from 'react-vr-web';
import * as Cloth from './Cloth';

export class ChangModule extends Module{
  constructor(){
    super('ChangModule')
  }

  changeWind(isWind){
    Cloth.changeWind(isWind)
  }
  changPins(){
    Cloth.changPins()
  }
}