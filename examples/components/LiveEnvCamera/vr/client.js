

import {VRInstance} from 'react-vr-web';
import * as THREE from 'three';
var scene,camera;
// 1 micrometer to 100 billion light years in one scene, with 1 unit = 1 meter?  preposterous!  and yet...
			var NEAR = 1e-6, FAR = 1e27;
			var SCREEN_WIDTH = window.innerWidth;
			var SCREEN_HEIGHT = window.innerHeight;
			var screensplit = .25, screensplit_right = 0;
			var mouse = [.5, .5];
			var zoompos = -100, minzoomspeed = .015;
			var zoomspeed = minzoomspeed;

			var container, border, stats;
			var objects = {};
			// Generate a number of text labels, from 1µm in size up to 100,000,000 light years
			// Try to use some descriptive real-world examples of objects at each scale

			var labeldata = [
				{ size: .01,           scale: 0.0001, label: "microscopic (1µm)" }, // FIXME - triangulating text fails at this size, so we scale instead
				{ size: .01,           scale: 0.1,  label: "minuscule (1mm)" },
				{ size: .01,           scale: 1.0,  label: "tiny (1cm)" },
				{ size: 1,             scale: 1.0,  label: "child-sized (1m)" },
				{ size: 10,            scale: 1.0,  label: "tree-sized (10m)" },
				{ size: 100,           scale: 1.0,  label: "building-sized (100m)" },
				{ size: 1000,          scale: 1.0,  label: "medium (1km)" },
				{ size: 10000,         scale: 1.0,  label: "city-sized (10km)" },
				{ size: 3400000,       scale: 1.0,  label: "moon-sized (3,400 Km)" },
				{ size: 12000000,      scale: 1.0,  label: "planet-sized (12,000 km)" },
				{ size: 1400000000,    scale: 1.0,  label: "sun-sized (1,400,000 km)" },
				{ size: 7.47e12,       scale: 1.0,  label: "solar system-sized (50Au)" },
				{ size: 9.4605284e15,  scale: 1.0,  label: "gargantuan (1 light year)" },
				{ size: 3.08567758e16, scale: 1.0,  label: "ludicrous (1 parsec)" },
				{ size: 1e19,          scale: 1.0,  label: "mind boggling (1000 light years)" },
				{ size: 1.135e21,      scale: 1.0,  label: "galaxy-sized (120,000 light years)" },
				{ size: 9.46e23,       scale: 1.0,  label: "... (100,000,000 light years)" }
			];
			// const url = '../static_assets/helvetiker_regular.typeface.json'
			// const url = asset('chess-world.jpg')
			// console.log(url)
function init(bundle, parent, options) {
	// camera = new THREE.PerspectiveCamera( 50, screensplit * SCREEN_WIDTH / SCREEN_HEIGHT, NEAR, FAR );
	// scene = new THREE.Scene();
	// var light = new THREE.DirectionalLight(0xffffff, 1);
	// light.position.set(100,100,100);
	// scene.add(light);
	
	// var loader = new THREE.FontLoader();
	// loader.load( url, function ( font ) {
	// 	scene = initScene( font );
	// } );

	// addModel();

	const vr = new VRInstance(bundle, 'VideoSample', parent, {
		cursorVisibility: 'visible',
		scene: scene,
		camera:camera,
		hideCompass:false,
		disableTouchPanning:true,
		width:100,
		height:200,
		allowCarmelDeeplink:true,
		hideFullscreen:false,
		enableHotReload:true,
		...options,
	});
	
	vr.render = function() {
		// render();
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
	// var amount = event.deltaY;
	// if ( amount === 0 ) return;
	// var dir = amount / Math.abs(amount);
	// zoomspeed = dir/10;

	// // Slow down default zoom speed after user starts zooming, to give them more control
	// minzoomspeed = 0.001;

  if (event.deltaY > 0 ){
     if(window.playerCamera.zoom  > 0.11) {
       window.playerCamera.zoom -= 0.1;
       window.playerCamera.updateProjectionMatrix();
      }
   }
   else {
     if(window.playerCamera.zoom < 1000) {
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
    break;
	
    default:
    return;
  }
}
//-------------------------------接受消息-e-------------------------------

function addModel(){
	
}

function render(){

	// Put some limits on zooming
	var minzoom = labeldata[0].size * labeldata[0].scale*1;
	var maxzoom = labeldata[labeldata.length-1].size * labeldata[labeldata.length-1].scale * 100;
	var damping = (Math.abs(zoomspeed) > minzoomspeed ? .95 : 1.0);

	// Zoom out faster the further out you go
	var zoom = THREE.Math.clamp(Math.pow(Math.E, zoompos), minzoom, maxzoom);
	zoompos = Math.log(zoom);

	// Slow down quickly at the zoom limits
	if ((zoom == minzoom && zoomspeed < 0) || (zoom == maxzoom && zoomspeed > 0)) {
		damping = .85;
	}

	zoompos += zoomspeed;
	zoomspeed *= damping;

	camera.position.x = Math.sin(.5 * Math.PI * (mouse[0] - .5)) * zoom;
	camera.position.y = Math.sin(.25 * Math.PI * (mouse[1] - .5)) * zoom;
	camera.position.z = Math.cos(.5 * Math.PI * (mouse[0] - .5)) * zoom;
	if(scene) camera.lookAt(scene.position);

	// Update renderer sizes if the split has changed
	if (screensplit_right != 1 - screensplit) {
		updateRendererSizes();
	}


}

function initScene( font ) {


	var materialargs = {
		color: 0xffffff,
		specular: 0x050505,
		shininess: 50,
		shading: THREE.SmoothShading,
		emissive: 0x000000
	};

	var meshes = [];

	var geometry = new THREE.SphereBufferGeometry(0.5, 24, 12);

	for (var i = 0; i < labeldata.length; i++) {

		var scale = labeldata[i].scale || 1;

		var labelgeo = new THREE.TextGeometry( labeldata[i].label, {
			font: font,
			size: labeldata[i].size,
			height: labeldata[i].size / 2
		} );

		labelgeo.computeBoundingSphere();

		// center text
		labelgeo.translate( - labelgeo.boundingSphere.radius, 0, 0 );

		materialargs.color = new THREE.Color().setHSL( Math.random(), 0.5, 0.5 );

		var material = new THREE.MeshPhongMaterial( materialargs );

		var group = new THREE.Group();
		group.position.z = -labeldata[i].size * scale;
		scene.add(group);

		var textmesh = new THREE.Mesh( labelgeo, material );
		textmesh.scale.set(scale, scale, scale);
		textmesh.position.z = -labeldata[i].size * scale;
		textmesh.position.y = labeldata[i].size / 4 * scale;
		group.add(textmesh);

		var dotmesh = new THREE.Mesh(geometry, material);
		dotmesh.position.y = -labeldata[i].size / 4 * scale;
		dotmesh.scale.multiplyScalar(labeldata[i].size * scale);
		group.add(dotmesh);

	}

}


	function updateRendererSizes() {
		// Recalculate size for both renderers when screen size or split location changes
		SCREEN_WIDTH = window.innerWidth;
		SCREEN_HEIGHT = window.innerHeight;
		screensplit_right = 1 - screensplit;
		camera.aspect = screensplit_right * SCREEN_WIDTH / SCREEN_HEIGHT;
		camera.updateProjectionMatrix();
		camera.setViewOffset( SCREEN_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH * screensplit, 0, SCREEN_WIDTH * screensplit_right, SCREEN_HEIGHT );

	}