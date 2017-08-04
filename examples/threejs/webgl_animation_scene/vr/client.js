/**
 * The examples provided by Oculus are for non-commercial testing and
 * evaluation purposes only.
 *
 * Oculus reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * OCULUS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Auto-generated content.
import {VRInstance} from 'react-vr-web';
import * as THREE from 'three';

var mixer, object, scene, camera, clock;
var SCREEN_WIDTH = window.innerWidth
var SCREEN_HEIGHT = window.innerHeight

var url = './static_assets/scene-animation.json';

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
  return vr;
}

window.ReactVR = {init};


function addModel(){
  	new THREE.ObjectLoader().load( url, function ( loadedScene ) {

		scene.add(loadedScene);
		loadedScene.position.set(0,0,-120)
		loadedScene.rotation.set(0,90,0)
		var animationClip = loadedScene.animations[ 0 ];
		mixer = new THREE.AnimationMixer( loadedScene );
		mixer.clipAction( animationClip ).play();
	} );
}

function simulate(){
	var delta = 0.75 * clock.getDelta();
	if(mixer) mixer.update( delta );
}