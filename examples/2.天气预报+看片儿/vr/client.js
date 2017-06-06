// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance, addCustomizedVideoPlayer} from 'react-vr-web';
import * as OVRUI from 'ovrui';

var fallbackFonts = {
'./static_assets/fonts/cjk_0.fnt':'./static_assets/fonts/cjk_0_sdf.png',
'./static_assets/fonts/cjk_1.fnt':'./static_assets/fonts/cjk_1_sdf.png',
'./static_assets/fonts/cjk_2.fnt':'./static_assets/fonts/cjk_2_sdf.png',
};
var font = OVRUI.loadFont();
var count = 0 ;

function init(bundle, parent, options) {

  // globaldata.remote_ip_info = window.remote_ip_info//存入城市

  function addFallback(fallbackFont){
    OVRUI.addFontFallback(font, fallbackFont);
    count--;
    
    if (count ===  0 ) {
      var pairs = [['city',window.remote_ip_info.city]]
      multiSet(pairs,function(e){
        console.log(e)
      })
      const vr = new VRInstance(bundle, 'TianQi', parent, {
        // Add custom options here
        cursorVisibility: 'visible',
        font: font,
        // cursorVisibility: 'auto',
        ...options,
      });

      vr.render = function() {
        // Any custom behavior you want to perform on each frame goes here
      };
      // Begin the animation loop
      vr.start();
     
      return vr;
    }
}

function _prepareDB(){
  return new Promise((resolve, reject) => {
      // Open the database called 'AsyncStorage'
      const request = window.indexedDB.open('AsyncStorage', 1);
      request.onerror = event => {
        reject({
          message: 'Error opening database',
        });
      };
      request.onupgradeneeded = event => {
        const db = event.target.result;
        // If the database has not been created yet, create an object store
        // called 'pairs', with an index called 'key'
        db.createObjectStore('pairs', {keyPath: 'key'});
        resolve(db);
      };
      request.onsuccess = event => {
        const db = event.target.result;
        resolve(db);
      };
    });
}
function _putRow(objectStore: IDBObjectStore, row: {[key: string]: string}): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = objectStore.put(row);
      request.onerror = event => {
        reject({
          message: event.target.error.name,
          key: row.key,
        });
      };
      request.onsuccess = () => {
        resolve();
      };
    });
  }
function multiSet(pairs: Array<[string, string]>): void {
  _prepareDB()
      .then(db => {
        const transaction = db.transaction(['pairs'], 'readwrite');
        const objectStore = transaction.objectStore('pairs');
        const puts = [];
        pairs.forEach(pair => {
          const row = {key: pair[0], value: pair[1]};
          puts.push(_putRow(objectStore, row));
        });
        return Promise.all(puts);
      })
      .then(
        () => {
          console.log('存储成功')
        },
        err => {
          console.log(err)
          
        }
      );
}

for ( var key  in fallbackFonts) {
    count++;
    OVRUI.loadFont(key, fallbackFonts[key]).then((fallbackFont) => {
      addFallback(fallbackFont);
    });
  }
}


window.ReactVR = {init};
