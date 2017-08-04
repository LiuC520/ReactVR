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
var mixer,camera;
var morphs=[];

function init(bundle, parent, options) {
  const scene = new THREE.Scene();
  const clock = new THREE.Clock();

  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 100 );
  camera.position.set( -10, 3.43, 11.31 );
  camera.lookAt( new THREE.Vector3( - 1.22, 2.18, 4.58 ) );

  new THREE.ObjectLoader().load( '../static_assets/pump/pump.json', function ( model ) {

				scene.add( model );
        morphs.push(model);

				mixer = new THREE.AnimationMixer( model );
				mixer.clipAction( model.animations[ 0 ] ).play();
			} );
  const vr = new VRInstance(bundle, 'VideoSample', parent, {
    // Show a gaze cursor.
    cursorVisibility: 'visible',
    scene: scene,
    camera:camera,
    ...options,
  });
   
    // this.videoElement.setAttribute('tvp_loadingad_ended','1');
  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
    if(mixer){
      mixer.update( clock.getDelta() );
    }
    
   	for ( var i = 0; i < morphs.length; i ++ ) {
          var morph = morphs[ i ];
          morph.position.z =-10;
          morph.position.y =0;
          morph.position.x =2;
				}
  };
  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = {init};