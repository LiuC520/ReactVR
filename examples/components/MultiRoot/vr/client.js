// Auto-generated content.
// This file contains the boilerplate to set up your React app.
// If you want to modify your application, start in "index.vr.js"

// Auto-generated content.
import {VRInstance} from 'react-vr-web';

function init(bundle, parent, options) {
  const vr = new VRInstance(bundle, 'text', parent, {
    // Add custom options here
    ...options,
  });
  vr.render = function() {
    // Any custom behavior you want to perform on each frame goes here
  };
    // Custom code begins here!!!

  // We need to add the camera to our scene in order for its children to be
  // rendered.
  // Alternatively, we could add a <Scene> element to our main React tree, which
  // also attaches the camera to the scene graph.
  // vr.scene.add(vr.camera());
  // // Mount the <HUD> component, with some initial props, to the camera object.
  // // This means that our component will move as the camera moves.
  // vr.mountComponent('HUD', {message: 'Hello'}, null);

  // Begin the animation loop
  vr.start();
  return vr;
}

window.ReactVR = {init};
