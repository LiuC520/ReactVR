/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

/**
 * RCTLiveEnvCamera
 * Displays the environment facing camera on a sphere
 * @class RCTLiveEnvCamera
 * @extends RCTBaseView
 */

import RCTBaseView from './BaseView';
import merge from '../Utils/merge';
import * as OVRUI from 'ovrui';
import * as THREE from 'three';
import * as Yoga from '../Utils/Yoga.bundle';

// display texture always infront of the camera
const basic_vert = `
      varying highp vec4 vUv;
      void main()
      {
          vUv = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          vUv.xy = (vUv.xy + vec2(vUv.w)) * 0.5;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
  `;

const basic_frag = `
      uniform sampler2D map;
      varying highp vec4 vUv;
      void main()
      {
        gl_FragColor = texture2DProj( map, vUv );
      }
  `;

const SPHERE_RADIUS = 1000;

const sphereRayCast = (function() {
  // avoid create temp objects;
  const inverseMatrix = new THREE.Matrix4();
  const ray = new THREE.Ray();
  const sphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), SPHERE_RADIUS);
  const intersectionPoint = new THREE.Vector3();
  const intersectionPointWorld = new THREE.Vector3();
  return function(raycaster, intersects) {
    // transform the ray into the space of the sphere
    inverseMatrix.getInverse(this.matrixWorld);
    ray.copy(raycaster.ray).applyMatrix4(inverseMatrix);
    const intersect = ray.intersectSphere(sphere, intersectionPoint);
    if (intersect === null) {
      return;
    }

    // determine hit location in world space
    intersectionPointWorld.copy(intersectionPoint);
    intersectionPointWorld.applyMatrix4(this.matrixWorld);

    const distance = raycaster.ray.origin.distanceTo(intersectionPointWorld);
    if (distance < raycaster.near || distance > raycaster.far) {
      return;
    }

    intersects.push({
      distance: distance,
      point: intersectionPointWorld.clone(),
      object: this,
    });
  };
})();

export default class RCTLiveEnvCamera extends RCTBaseView {
  /**
   * constructor: allocates the required resources and sets defaults
   */
  constructor(guiSys, rnctx) {
    super();

    navigator.getUserMedia =
      navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.mediaDevices.getUserMedia;
        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

// https://www.w3.org/TR/mediacapture-streams/
// http://blog.csdn.net/journey191/article/details/40744015
// http://blog.csdn.net/starcrm/article/details/52576387
// 在谷歌浏览器上需要用navigator.mediaDevices.getUserMedia
// 在移动设备上还可以这样设置：
// { audio: true, video: { facingMode: "user" } }			//设置前置摄像头
// { audio: true, video: { facingMode: { exact: "environment" } } }	//设置后置摄像头
// var flag=false;
// { video: { facingMode: (flag? "user" : "environment") } };	

    const constraints = {
      audio:true,
      // video: {facingMode: {exact: 'environment'}},
      //这个要在google浏览器上会报错ConstraintNotSatisfiedError，把这个改成true就行了
      video: true,
      // video: {
      //   mandatory: {
      //       minWidth: 1280,
      //       minHeight: 720,
      //       /*Added by Chad*/
      //       maxWidth: 1280,
      //       maxHeight: 720,
      //   },
      //     optional:[
      //     { minFrameRate: 60 },
      //     { maxWidth: 1280 },
      //     { maxHeigth: 720 }
      //   ]
      // },//这个要在google浏览器上会报错ConstraintNotSatisfiedError，把这个改成true就行了
    };
    const video = document.createElement('video');
    const videoTexture = new THREE.Texture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    this._video = video;
    this._videoTexture = videoTexture;
    navigator.getUserMedia(
      constraints,
      stream => {
        video.src = window.URL.createObjectURL(stream);
      },
      error => {
        console.log('navigator.getUserMedia error: ', error);
      }
    );

    this._sphereGeometry = new THREE.SphereGeometry(SPHERE_RADIUS, 20, 20);
    this._material = new THREE.ShaderMaterial({
      uniforms: {
        map: {
          value: videoTexture,
          type: 't',
        },
      },
      vertexShader: basic_vert,
      fragmentShader: basic_frag,
      side: THREE.DoubleSide,
    });

    this._onUpdate = this._onUpdate.bind(this);

    this._globe = new THREE.Mesh(this._sphereGeometry, this._material);
    this._globe.raycast = sphereRayCast.bind(this._globe);
    this._globe.rotation.y = -Math.PI / 2;
    this._globe.onUpdate = this._onUpdate;

    this.view = new OVRUI.UIView(guiSys);
    this.view.add(this._globe);
  }

  _onUpdate(scene, camera) {
    if (this._video.readyState === this._video.HAVE_ENOUGH_DATA) {
      this._videoTexture.needsUpdate = true;
    }
  }

  presentLayout() {
    super.presentLayout();
    this._globe.visible = this.YGNode.getDisplay() !== Yoga.DISPLAY_NONE;
  }

  /**
   * Dispose of any associated resources
   */
  dispose() {
    if (this._localResource) {
      this._localResource.dispose();
    }
    super.dispose();
  }

  /**
   * Describes the properties representable by this view type and merges
   * with super type
   */
  static describe() {
    return merge(super.describe(), {
      // declare the native props sent from react to runtime
      NativeProps: {},
    });
  }
}
