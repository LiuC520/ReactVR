

import {VRInstance} from 'react-vr-web';
import * as THREE from 'three';

var mixer, object, scene, camera, clock, mesh, skeleton;

			var idleAction, walkAction, runAction;
			var idleWeight, walkWeight, runWeight;
			var actions;
			var settings;
			var singleStepMode = false;
			var sizeOfNextStep = 0;
var SCREEN_WIDTH = window.innerWidth
var SCREEN_HEIGHT = window.innerHeight

var url = '../static_assets/marine_anims_core.json';
var mouseX=0,mouseY=0;

function init(bundle, parent, options) {

	scene = new THREE.Scene();
 	clock = new THREE.Clock();
	addModel();

	const vr = new VRInstance(bundle, 'VideoSample', parent, {
		cursorVisibility: 'visible',
		scene: scene,
		...options,
	});
	
	vr.render = function() {
		simulate();
	};
	vr.start();

	window.vr = vr;
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
	window.oncontextmenu = function(e){
		return false;
	}
}
function onClick(){
	if(event.button==2){
		mouseX = event.x;
		mouseY = event.y;
	}
}
function onMouseMove(){
	if(mouseX != 0 && mouseY != 0){
		let dx = (event.x - mouseX)/event.x
		let dy = (event.y - mouseY)/event.y
		let d=0
		if(dx>0){
			d = dx*200
		}else{
			d = dx*20
		}
	  	mesh.rotation.set(0,(d-135) * Math.PI / 180,0)
	}
}
function onMouseUp(){
		mouseX = 0;
		mouseY = 0;
}
function onRendererMouseWheel(){
	  mesh.rotation.set(0, (event.deltaY- 135) * Math.PI / 180,0)
}
//-------------------------------接受消息-s-------------------------------
function onVRMessage(e) {
  switch (e.data.type) {
	case 'showModel':
		showModel(e.data.data);
    break;
	case 'showSkeleton':
		showSkeleton(e.data.data);
    break;
	case 'modifyTimeScale':
		modifyTimeScale(e.data.data);
    break;
	case 'prepareCrossFade':
	if(e.data.data == 'walk_to_idle'){
		walk_to_idle();
	}else if(e.data.data == 'idle_to_walk'){
		idle_to_walk();
	}else if(e.data.data == 'walk_to_run'){
		walk_to_run();
	}else if(e.data.data == 'run_to_walk'){
		run_to_walk();
	}
    break;
	case 'pauseContinue':
		pauseContinue();
    break;
	case 'singlestep':
		toSingleStepMode();
    break;
	
    
    default:
    return;
  }
}
//-------------------------------接受消息-e-------------------------------

function addModel(){
  	
	new THREE.ObjectLoader().load( url, function ( loadedObject ) {
		loadedObject.traverse( function ( child ) {
			if ( child instanceof THREE.SkinnedMesh ) {
				mesh = child;
			}
		} );
		if ( mesh === undefined ) {
			alert( 'Unable to find a SkinnedMesh in this place:\n\n' + url + '\n\n' );
			return;
		}
		// Add mesh and skeleton helper to scene
		mesh.rotation.y = - 135 * Math.PI / 180;
		mesh.position.set(0,-150,-350)
		
		scene.add( mesh );
		skeleton = new THREE.SkeletonHelper( mesh );
		skeleton.visible = false;
		scene.add( skeleton );
		// Initialize camera and camera controls
		var radius = mesh.geometry.boundingSphere.radius;
		var aspect = window.innerWidth / window.innerHeight;
		camera = new THREE.PerspectiveCamera( 45, aspect, 1, 10000 );
		camera.position.set( 0.0, radius, radius * 3.5 );
			// Create the control panel

				createPanel();
		// Initialize mixer and clip actions
		mixer = new THREE.AnimationMixer( mesh );
		idleAction = mixer.clipAction( 'idle' );
		walkAction = mixer.clipAction( 'walk' );
		runAction = mixer.clipAction( 'run' );
		actions = [ idleAction, walkAction, runAction ];
		activateAllActions();
		// Listen on window resizing and start the render loop
	} );
}

function simulate(){
	 if(mixer){
				idleWeight = idleAction.getEffectiveWeight();
				walkWeight = walkAction.getEffectiveWeight();
				runWeight = runAction.getEffectiveWeight();

				var mixerUpdateDelta = clock.getDelta();
				// If in single step mode, make one step and then do nothing (until the user clicks again)
				if ( singleStepMode ) {
					mixerUpdateDelta = sizeOfNextStep;
					sizeOfNextStep = 0;
				}

				// Update the animation mixer, the stats panel, and render this frame
				mixer.update( mixerUpdateDelta );
	 }
}
function createPanel() {
	settings = {
		'show model':            true,
		'show skeleton':         false,
		'deactivate all':        deactivateAllActions,
		'activate all':          activateAllActions,
		'pause/continue':        pauseContinue,
		'make single step':      toSingleStepMode,
		'modify step size':      0.05,
		'use default duration':  true,
		'set custom duration':   3.5,
		'modify idle weight':    0.0,
		'modify walk weight':    1.0,
		'modify run weight':     0.0,
		'modify time scale':     1.0
	};
}
	function showModel( visibility ) {
		mesh.visible = visibility;
	}

	function showSkeleton( visibility ) {
		skeleton.visible = visibility;
	}

	function modifyTimeScale( speed ) {
		mixer.timeScale = speed;
	}

	function deactivateAllActions() {
		actions.forEach( function ( action ) {
			action.stop();
		} );
	}

	function activateAllActions() {
		setWeight( idleAction, settings[ 'modify idle weight' ] );
		setWeight( walkAction, settings[ 'modify walk weight' ] );
		setWeight( runAction, settings[ 'modify run weight' ] );
		actions.forEach( function ( action ) {
			action.play();
		} );
	}


	function pauseContinue() {
		if ( singleStepMode ) {
			singleStepMode = false;
			unPauseAllActions();
		} else {
			if ( idleAction.paused ) {
				unPauseAllActions();
			} else {
				pauseAllActions();
			}
		}
	}

	function pauseAllActions() {
		actions.forEach( function ( action ) {
			action.paused = true;
		} );
	}

	function unPauseAllActions() {
		actions.forEach( function ( action ) {
			action.paused = false;
		} );
	}

	function toSingleStepMode() {
		unPauseAllActions();
		singleStepMode = true;
		sizeOfNextStep = settings[ 'modify step size' ];
	}

	function walk_to_idle(){
		prepareCrossFade( walkAction, idleAction, 1.0 )
	}
	function idle_to_walk(){
		prepareCrossFade( idleAction, walkAction, 0.5  )
	}
	function walk_to_run(){
		prepareCrossFade( walkAction, runAction, 2.5 )
	}
	function run_to_walk(){
		prepareCrossFade( runAction, walkAction, 5.0)
	}
//从跑-走-停
	function prepareCrossFade( startAction, endAction, defaultDuration ) {
		// Switch default / custom crossfade duration (according to the user's choice)
		var duration = setCrossFadeDuration( defaultDuration );
		// Make sure that we don't go on in singleStepMode, and that all actions are unpaused
		singleStepMode = false;
		unPauseAllActions();
		// If the current action is 'idle' (duration 4 sec), execute the crossfade immediately;
		// else wait until the current action has finished its current loop
		if ( startAction === idleAction ) {
			executeCrossFade( startAction, endAction, duration );
		} else {
			synchronizeCrossFade( startAction, endAction, duration );
		}
	}
	//设置从跑-走的切换的时间间隔
	function setCrossFadeDuration( defaultDuration ) {
		// Switch default crossfade duration <-> custom crossfade duration
		if ( settings[ 'use default duration' ] ) {
			return defaultDuration;
		} else {
			return settings[ 'set custom duration' ];
		}
	}

	function synchronizeCrossFade( startAction, endAction, duration ) {
		mixer.addEventListener( 'loop', onLoopFinished );
		function onLoopFinished( event ) {
			if ( event.action === startAction ) {
				mixer.removeEventListener( 'loop', onLoopFinished );
				executeCrossFade( startAction, endAction, duration );
			}
		}
	}

	function executeCrossFade( startAction, endAction, duration ) {
		// Not only the start action, but also the end action must get a weight of 1 before fading
		// (concerning the start action this is already guaranteed in this place)
		setWeight( endAction, 1 );
		endAction.time = 0;
		// Crossfade with warping - you can also try without warping by setting the third parameter to false
		startAction.crossFadeTo( endAction, duration, true );
	}

	// This function is needed, since animationAction.crossFadeTo() disables its start action and sets
	// the start action's timeScale to ((start animation's duration) / (end animation's duration))

	function setWeight( action, weight ) {
		action.enabled = true;
		action.setEffectiveTimeScale( 1 );
		action.setEffectiveWeight( weight );
	}
