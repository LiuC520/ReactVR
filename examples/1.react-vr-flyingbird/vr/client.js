

import {VRInstance,Module} from 'react-vr-web';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';

import Boid from '../components/bird/boid.js'
import Bird from '../components/bird/bird.js'

var fallbackFonts = {
'../static_assets/fonts/cjk_0.fnt':'../static_assets/fonts/cjk_0_sdf.png',
'../static_assets/fonts/cjk_1.fnt':'../static_assets/fonts/cjk_1_sdf.png',
'../static_assets/fonts/cjk_2.fnt':'../static_assets/fonts/cjk_2_sdf.png',
};

var font = OVRUI.loadFont();
var count = 0 ;

function init(bundle, parent, options) {
  function addFallback(fallbackFont){
    OVRUI.addFontFallback(font, fallbackFont);
    count--;
    
    if (count ===  0 ) {
        const scene = new THREE.Scene();
        birds = [];
				boids = [];
        for ( var i = 0; i < 200; i ++ ) {

					boid = boids[ i ] = new Boid();
					boid.position.x = Math.random() * 400 - 200;
					boid.position.y = Math.random() * 400 - 200;
					boid.position.z = Math.random() * 400 - 200;
					boid.velocity.x = Math.random() * 2 - 1;
					boid.velocity.y = Math.random() * 2 - 1;
					boid.velocity.z = Math.random() * 2 - 1;
					boid.setAvoidWalls( true );
					boid.setWorldSize( 500, 500, 400 );

					bird = birds[ i ] = new THREE.Mesh( new Bird(), new THREE.MeshBasicMaterial( { color:Math.random() * 0xffffff, side: THREE.DoubleSide } ) );
					bird.phase = Math.floor( Math.random() * 62.83 );
					scene.add( bird );
				}

      const vr = new VRInstance(bundle, 'react_vr_flyingbird', parent, {
        font: font,
        ...options,
        cursorVisibility: 'visible',
        scene: scene,
      });

      vr.render = function(timestamp) {
        // Any custom behavior you want to perform on each frame goes here
        for ( var i = 0, il = birds.length; i < il; i++ ) {

					boid = boids[ i ];
					boid.run( boids );

					bird = birds[ i ];
					bird.position.copy( boids[ i ].position );

					color = bird.material.color;
					color.r = color.g = color.b = ( 500 - bird.position.z ) / 1000;

					bird.rotation.y = Math.atan2( - boid.velocity.z, boid.velocity.x );
					bird.rotation.z = Math.asin( boid.velocity.y / boid.velocity.length() );

					bird.phase = ( bird.phase + ( Math.max( 0, bird.rotation.z ) + 0.1 )  ) % 62.83;
					bird.geometry.vertices[ 5 ].y = bird.geometry.vertices[ 4 ].y = Math.sin( bird.phase ) * 5;

				}
      };
      // Begin the animation loop
      vr.start();
      return vr;
    }
}
for ( var key  in fallbackFonts) {
    count++;
    OVRUI.loadFont(key, fallbackFonts[key]).then((fallbackFont) => {
      addFallback(fallbackFont);
    });
  }
}

window.ReactVR = {init};

