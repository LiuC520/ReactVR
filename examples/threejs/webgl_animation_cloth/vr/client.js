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
import * as Cloth from './Cloth';
import {OrbitControls} from './OrbitControls';
import {ChangModule} from './ChangModule'

var clothGeometry, sphere, object, scene, camera;


function init(bundle, parent, options) {

  const changModule = new ChangModule();
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );

  camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set( 1000, 50,1500 );

  addCloth();
        
  const vr = new VRInstance(bundle, 'VideoSample', parent, {
    // Show a gaze cursor.
    cursorVisibility: 'visible',
    scene: scene,
    camera:camera,
    nativeModules:[changModule],
    ...options,
  });
   
  vr.render = function() {
   			simulate();
  };
  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = {init};


function addCloth(){
  light = new THREE.DirectionalLight( 0xdfebff, 1.75 );
				light.position.set( 50, 200, 100 );
				light.position.multiplyScalar( 1.3 );
				light.castShadow = true;
				light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
				var d = 300;
				light.shadow.camera.left = - d;
				light.shadow.camera.right = d;
				light.shadow.camera.top = d;
				light.shadow.camera.bottom = - d;
				light.shadow.camera.far = 1000;
        scene.add( light );
       // cloth material

				var loader = new THREE.TextureLoader();
				var clothTexture = loader.load( './static_assets/circuit_pattern.png' );
				clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping;
				clothTexture.anisotropy = 16;

				var clothMaterial = new THREE.MeshPhongMaterial( {
					specular: 0x030303,
					map: clothTexture,
					side: THREE.DoubleSide,
					alphaTest: 0.5
				} );

				// cloth geometry
				clothGeometry = new THREE.ParametricGeometry( Cloth.clothFunction, Cloth.cloth.w, Cloth.cloth.h );
        clothGeometry.dynamic = true;
        
        
				var uniforms = { texture:  { value: clothTexture } };
				// var vertexShader = document.getElementById( 'vertexShaderDepth' ).textContent;
				// var fragmentShader = document.getElementById( 'fragmentShaderDepth' ).textContent;

				// cloth mesh

				object = new THREE.Mesh( clothGeometry, clothMaterial );
				object.position.set( 0, 0, 0 );
				object.castShadow = true;
				scene.add( object );

				// object.customDepthMaterial = new THREE.ShaderMaterial( {
				// 	uniforms: uniforms,
				// 	vertexShader: vertexShader,
				// 	fragmentShader: fragmentShader,
				// 	side: THREE.DoubleSide
        // } );
        
        // sphere

				var ballGeo = new THREE.SphereGeometry( Cloth.ballSize, 20, 20 );
				var ballMaterial = new THREE.MeshPhongMaterial( { color: 0xaaaaaa } );

				sphere = new THREE.Mesh( ballGeo, ballMaterial );
				sphere.castShadow = true;
				sphere.receiveShadow = true;
        scene.add( sphere );
        
				// ground

				var groundTexture = loader.load( './static_assets/grasslight-big.jpg' );
				groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
				groundTexture.repeat.set( 25, 25 );
				groundTexture.anisotropy = 16;

				var groundMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: groundTexture } );

				var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
				mesh.position.y = - 250;
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				scene.add( mesh );

				// poles

				var poleGeo = new THREE.BoxGeometry( 5, 375, 5 );
				var poleMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, shininess: 100 } );

				var mesh = new THREE.Mesh( poleGeo, poleMat );
				mesh.position.x = - 125;
				mesh.position.y = - 62;
				mesh.receiveShadow = true;
				mesh.castShadow = true;
				scene.add( mesh );

				var mesh = new THREE.Mesh( poleGeo, poleMat );
				mesh.position.x = 125;
				mesh.position.y = - 62;
				mesh.receiveShadow = true;
				mesh.castShadow = true;
				scene.add( mesh );

				var mesh = new THREE.Mesh( new THREE.BoxGeometry( 255, 5, 5 ), poleMat );
				mesh.position.y = - 250 + ( 750 / 2 );
				mesh.position.x = 0;
				mesh.receiveShadow = true;
				mesh.castShadow = true;
				scene.add( mesh );

				var gg = new THREE.BoxGeometry( 10, 10, 10 );
				var mesh = new THREE.Mesh( gg, poleMat );
				mesh.position.y = - 250;
				mesh.position.x = 125;
				mesh.receiveShadow = true;
				mesh.castShadow = true;
				scene.add( mesh );

				var mesh = new THREE.Mesh( gg, poleMat );
				mesh.position.y = - 250;
				mesh.position.x = - 125;
				mesh.receiveShadow = true;
				mesh.castShadow = true;
				scene.add( mesh );
				// controls
				var controls = new OrbitControls( camera );
				controls.maxPolarAngle = Math.PI * 0.5;
				controls.minDistance = 1000;
        controls.maxDistance = 7500;
        sphere.visible = false;
}

function simulate(){
  var time = Date.now();

  var windStrength = Math.cos( time / 7000 ) * 20 + 40;
  var windForce = Cloth.windForce;
  windForce.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) )
  windForce.normalize()
  windForce.multiplyScalar( windStrength );


  var p = Cloth.cloth.particles;

  for ( var i = 0, il = p.length; i < il; i ++ ) {

    clothGeometry.vertices[ i ].copy( p[ i ].position );

  }

  clothGeometry.computeFaceNormals();
  clothGeometry.computeVertexNormals();

  clothGeometry.normalsNeedUpdate = true;
  clothGeometry.verticesNeedUpdate = true;
  
  Cloth.simulate( time, clothGeometry );

  sphere.position.copy( Cloth.ballPosition );

  camera.lookAt( [-45,0,0] );
}