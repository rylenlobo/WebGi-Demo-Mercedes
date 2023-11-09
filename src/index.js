import {
  ViewerApp,
  AssetManagerPlugin,
  addBasePlugins,
  TweakpaneUiPlugin,
  AssetManagerBasicPopupPlugin,
  RendererUiPlugin,
  CanvasSnipperPlugin,
  PerspectiveCamera,
  CameraViewPlugin,
  ScrollableCameraViewPlugin,
} from "webgi";

import "./styles.css";

async function loadJSON() {
  const response = await fetch("../assets/preset.CameraViews.json");
  const data = await response.json();
  return data;
}

async function setupViewer() {
  const viewer = new ViewerApp({
    canvas: document.getElementById("webgi-canvas"),
  });

  await viewer.load("../assets/scene.glb");

  await addBasePlugins(viewer);

  const UI = await viewer.addPlugin(RendererUiPlugin);
  UI.scale = 4;

  await viewer.addPlugin(CameraViewPlugin);
  const camViewPlugin = viewer.getPlugin(CameraViewPlugin);

  const options = viewer.scene.activeCamera.getCameraOptions();
  options.controlsMode = false;

  await viewer
    .getManager()
    .importer.importPath("../assets/preset.CameraViews.json", {
      processImported: true,
    });

  const controls = viewer.scene.activeCamera.controls;
  controls.autoRotate = false;
  controls.autoRotateSpeed = true;
  controls.enableDamping = true;
  controls.rotateSpeed = 2.0;
  controls.enableZoom = false;

  camViewPlugin.animDuration = 5000;
  await camViewPlugin.animateAllViews();
  camViewPlugin.viewLooping = true;
}

setupViewer();
