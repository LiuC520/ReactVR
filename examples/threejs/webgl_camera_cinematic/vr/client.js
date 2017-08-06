

import {VRInstance} from 'react-vr-web';
import * as THREE from 'three';

			var camera, scene, raycaster, renderer;
			var mouse = new THREE.Vector2(), INTERSECTED;
			var radius = 100, theta = 0;
// var url = '../static_assets/knight.js';
			var effectController  = {

					focalLength: 15,
					// jsDepthCalculation: true,
					// shaderFocus: false,
					//
					fstop: 2.8,
					// maxblur: 1.0,
					//
					showFocus: false,
					focalDepth: 3,
					// manualdof: false,
					// vignetting: false,
					// depthblur: false,
					//
					// threshold: 0.5,
					// gain: 2.0,
					// bias: 0.5,
					// fringe: 0.7,
					//
					// focalLength: 35,
					// noise: true,
					// pentagon: false,
					//
					// dithering: 0.0001

				};
function init(bundle, parent, options) {
camera = new THREE.CinematicCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.setLens(5);
        		camera.position.set(2, 1, 500);


				scene = new THREE.Scene();
				scene.add( new THREE.AmbientLight( 0xffffff, 0.3 ) );

				var light = new THREE.DirectionalLight( 0xffffff, 0.35 );
				light.position.set( 1, 1, 1 ).normalize();
				scene.add( light );


				var geometry = new THREE.BoxGeometry( 20, 20, 20 );

				for ( var i = 0; i < 1500; i ++ ) {

					var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

					object.position.x = Math.random() * 800 - 400;
					object.position.y = Math.random() * 800 - 400;
					object.position.z = Math.random() * 800 - 400;

					scene.add( object );

				}

				raycaster = new THREE.Raycaster();

	addModel();

	const vr = new VRInstance(bundle, 'VideoSample', parent, {
		cursorVisibility: 'visible',
		scene: scene,
		camera:camera,
		...options,
	});
	
	vr.render = function() {
		render();
	};
	vr.start();

	window.vr = vr;
	      window.playerCamera = vr.player.camera;

	onmouse();
	vr.rootView.context.worker.addEventListener('message', onVRMessage);//接受消息的在react vr那边直接  postMessage({ type: "sceneLoadStart"})

  return vr;
}

window.ReactVR = {init};
function onmouse(){
	window.onmousewheel = onRendererMouseWheel;
	window.onmousedown = onClick
	window.onmousemove= onMouseMove;
	window.onmouseup= onMouseUp;
	window.onkeydown = onKeyDown
	window.oncontextmenu = function(e){
		return false;
	}
}
function onClick(){
	if(event.button==2){
		// mouseX = event.x;
		// mouseY = event.y;
	}
}
function onMouseMove(){

				event.preventDefault();
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
function onMouseUp(){
		// mouseX = 0;
		// mouseY = 0;
}
function onRendererMouseWheel(){
  if (event.deltaY > 0 ){
     if(window.playerCamera.zoom  > 0.11) {
       window.playerCamera.zoom -= 0.1;
       window.playerCamera.updateProjectionMatrix();
      }
   }
   else {
     if(window.playerCamera.zoom < 100) {
      window.playerCamera.zoom += 0.1;
      window.playerCamera.updateProjectionMatrix();
     }
   }
}
function onKeyDown(){
	switch( event.keyCode ) {
		case 79: /*O*/
			break;
		case 80: /*P*/
			break;
	}
}

//-------------------------------接受消息-s-------------------------------
function onVRMessage(e) {
  switch (e.data.type) {
	case 'focalLength':
		effectController.focalLength = e.data.data
    break;
	case 'fstop':
		effectController.fstop = e.data.data
    break;
	case 'focalDepth':
		effectController.focalDepth = e.data.data
    break;
	
	case 'showFocus':
		effectController.showFocus = e.data.data
    break;
	
    
    default:
    return;
  }
matChanger();
}
//-------------------------------接受消息-e-------------------------------

function addModel(){
	
}

function render(){
			
				theta += 0.1;

				camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
				camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
				camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
				camera.lookAt( scene.position );

				camera.updateMatrixWorld();

				// find intersections

				raycaster.setFromCamera( mouse, camera );

				var intersects = raycaster.intersectObjects( scene.children );

				if ( intersects.length > 0 ) {

					var targetDistance = intersects[ 0 ].distance;
					
					//Using Cinematic camera focusAt method
					camera.focusAt(targetDistance);

					if ( INTERSECTED != intersects[ 0 ].object ) {

						if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

						INTERSECTED = intersects[ 0 ].object;
						INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
						INTERSECTED.material.emissive.setHex( 0xff0000 );
					}

				} else {

					if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

					INTERSECTED = null;

				}


}


				var matChanger = function( ) {

					for (var e in effectController) {
						if (e in camera.postprocessing.bokeh_uniforms)
						camera.postprocessing.bokeh_uniforms[ e ].value = effectController[ e ];
					}
					camera.postprocessing.bokeh_uniforms[ 'znear' ].value = camera.near;
					camera.postprocessing.bokeh_uniforms[ 'zfar' ].value = camera.far;
					camera.setLens(effectController.focalLength, camera.frameHeight ,effectController.fstop, camera.coc);
					effectController['focalDepth'] = camera.postprocessing.bokeh_uniforms["focalDepth"].value;
				};