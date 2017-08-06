

import {VRInstance} from 'react-vr-web';
import * as THREE from 'three';

var camera, scene;

var SCREEN_WIDTH = window.innerWidth
var SCREEN_HEIGHT = window.innerHeight
			var aspect = SCREEN_WIDTH / SCREEN_HEIGHT;

			var container, stats;
			var camera, scene, renderer, mesh;
			var cameraRig, activeCamera, activeHelper;
			var cameraPerspective, cameraOrtho;
			var cameraPerspectiveHelper, cameraOrthoHelper;
			var frustumSize = 600;
// var url = '../static_assets/knight.js';

function init(bundle, parent, options) {

	scene = new THREE.Scene();

				//

				camera = new THREE.PerspectiveCamera( 50, 0.5 * aspect, 1, 10000 );
				camera.position.z = 2500;
				scene.add( camera );
				
				cameraPerspective = new THREE.PerspectiveCamera( 50, 0.5 * aspect, 150, 1000 );

				cameraPerspectiveHelper = new THREE.CameraHelper( cameraPerspective );
				scene.add( cameraPerspectiveHelper );

				//
				cameraOrtho = new THREE.OrthographicCamera( 0.5 * frustumSize * aspect / - 2, 0.5 * frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 150, 1000 );

				cameraOrthoHelper = new THREE.CameraHelper( cameraOrtho );
				scene.add( cameraOrthoHelper );

				//

				activeCamera = cameraPerspective;
				activeHelper = cameraPerspectiveHelper;


				// counteract different front orientation of cameras vs rig

				cameraOrtho.rotation.y = Math.PI;
				cameraPerspective.rotation.y = Math.PI;

				cameraRig = new THREE.Group();

				cameraRig.add( cameraPerspective );
				cameraRig.add( cameraOrtho );

				scene.add( cameraRig );

				//

				mesh = new THREE.Mesh(
					new THREE.SphereBufferGeometry( 100, 16, 8 ),
					new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } )
				);
				scene.add( mesh );

				var mesh2 = new THREE.Mesh(
					new THREE.SphereBufferGeometry( 50, 16, 8 ),
					new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } )
				);
				mesh2.position.y = 150;
				mesh.add( mesh2 );

				var mesh3 = new THREE.Mesh(
					new THREE.SphereBufferGeometry( 5, 16, 8 ),
					new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: true } )
				);
				mesh3.position.z = 150;
				cameraRig.add( mesh3 );

				//

				var geometry = new THREE.Geometry();

				for ( var i = 0; i < 10000; i ++ ) {

					var vertex = new THREE.Vector3();
					vertex.x = THREE.Math.randFloatSpread( 2000 );
					vertex.y = THREE.Math.randFloatSpread( 2000 );
					vertex.z = THREE.Math.randFloatSpread( 2000 );

					geometry.vertices.push( vertex );

				}

				var particles = new THREE.Points( geometry, new THREE.PointsMaterial( { color: 0x888888 } ) );
				scene.add( particles );

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

	mouse();
	vr.rootView.context.worker.addEventListener('message', onVRMessage);//接受消息的在react vr那边直接  postMessage({ type: "sceneLoadStart"})

  return vr;
}

window.ReactVR = {init};
function mouse(){
	window.onmousewheel = onRendererMouseWheel;
	window.onmousedown = onClick
	window.onmousemove= onMouseMove;
	window.onmouseup= onMouseUp;
	window.onkeydown = onKeyDown
	window.onresize = onWindowResize
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
	// if(mouseX != 0 && mouseY != 0){
	// 	let dx = (event.x - mouseX)/event.x
	// 	let dy = (event.y - mouseY)/event.y
	// 	let d=0
	// 	if(dx>0){
	// 		d = dx*200
	// 	}else{
	// 		d = dx*20
	// 	}
	//   	mesh.rotation.set(0,(d-135) * Math.PI / 180,0)
	// }
}
function onMouseUp(){
		// mouseX = 0;
		// mouseY = 0;
}
function onRendererMouseWheel(){
function onRendererMouseWheel(){
  if (event.deltaY > 0 ){
     if(window.playerCamera.zoom  > 1) {
       window.playerCamera.zoom -= 0.1;
       window.playerCamera.updateProjectionMatrix();
      }
   }
   else {
     if(window.playerCamera.zoom < 10) {
      window.playerCamera.zoom += 0.1;
      window.playerCamera.updateProjectionMatrix();
     }
   }
}
}
function onKeyDown(){
	switch( event.keyCode ) {
		case 79: /*O*/
			activeCamera = cameraOrtho;
			activeHelper = cameraOrthoHelper;
			break;
		case 80: /*P*/
			activeCamera = cameraPerspective;
			activeHelper = cameraPerspectiveHelper;
			break;
	}
}
function onWindowResize(){

				SCREEN_WIDTH = window.innerWidth;
				SCREEN_HEIGHT = window.innerHeight;
				aspect = SCREEN_WIDTH / SCREEN_HEIGHT;


				camera.aspect = 0.5 * aspect;
				camera.updateProjectionMatrix();

				cameraPerspective.aspect = 0.5 * aspect;
				cameraPerspective.updateProjectionMatrix();

				cameraOrtho.left   = - 0.5 * frustumSize * aspect / 2;
				cameraOrtho.right  =   0.5 * frustumSize * aspect / 2;
				cameraOrtho.top    =   frustumSize / 2;
				cameraOrtho.bottom = - frustumSize / 2;
				cameraOrtho.updateProjectionMatrix();

}
//-------------------------------接受消息-s-------------------------------
function onVRMessage(e) {
  switch (e.data.type) {
	case 'showModel':

    break;
	
    
    default:
    return;
  }
}
//-------------------------------接受消息-e-------------------------------

function addModel(){
	
}

function render(){

				var r = Date.now() * 0.0005;

				mesh.position.x = 700 * Math.cos( r );
				mesh.position.z = 700 * Math.sin( r );
				mesh.position.y = 700 * Math.sin( r );

				mesh.children[ 0 ].position.x = 70 * Math.cos( 2 * r );
				mesh.children[ 0 ].position.z = 70 * Math.sin( r );

				if ( activeCamera === cameraPerspective ) {

					cameraPerspective.fov = 35 + 30 * Math.sin( 0.5 * r );
					cameraPerspective.far = mesh.position.length();
					cameraPerspective.updateProjectionMatrix();

					cameraPerspectiveHelper.update();
					cameraPerspectiveHelper.visible = true;

					cameraOrthoHelper.visible = false;

				} else {

					cameraOrtho.far = mesh.position.length();
					cameraOrtho.updateProjectionMatrix();

					cameraOrthoHelper.update();
					cameraOrthoHelper.visible = true;

					cameraPerspectiveHelper.visible = false;

				}

				cameraRig.lookAt( mesh.position );
			
				// activeHelper.visible = false;
				activeHelper.visible = true;

}