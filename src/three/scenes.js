// 3D scenes — Ghibli airship (hero) + white Totoro (services)
// Each initializer returns a dispose() cleanup function.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

const DRACO_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/';

// ------------------------------------------------------------------
// Hero — Ghibli tatami house / airship (casita.gltf, draco-compressed)
// ------------------------------------------------------------------
export function initHero3D(container, { onLoaded } = {}) {
  if (!container) return () => {};

  const W = () => container.clientWidth || 1;
  const H = () => container.clientHeight || 1;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(34, W() / H(), 0.1, 100);
  camera.position.set(4.4, 1.6, 5.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(W(), H());
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  container.appendChild(renderer.domElement);

  // ---- Lighting (warm key + cool fill) ----
  scene.add(new THREE.AmbientLight(0xfff2e0, 0.85));
  const key = new THREE.DirectionalLight(0xffdcae, 2.1);
  key.position.set(4, 6, 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xbcd2ff, 0.7);
  fill.position.set(-5, 1, -3);
  scene.add(fill);
  const rim = new THREE.PointLight(0xe8a87c, 18, 30);
  rim.position.set(-3, 2, 3);
  scene.add(rim);

  // ---- Dust motes / soot-sprite atmosphere ----
  const moteCount = 90;
  const mg = new THREE.BufferGeometry();
  const pos = new Float32Array(moteCount * 3);
  for (let i = 0; i < moteCount; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 12;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }
  mg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const motes = new THREE.Points(mg, new THREE.PointsMaterial({
    color: 0xe8a87c, size: 0.05, transparent: true, opacity: 0.55,
    depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  scene.add(motes);

  // ---- Model group ----
  const pivot = new THREE.Group();
  scene.add(pivot);
  const bob = new THREE.Group();
  pivot.add(bob);

  // ---- Controls ----
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.9;
  controls.minPolarAngle = Math.PI * 0.32;
  controls.maxPolarAngle = Math.PI * 0.62;
  controls.target.set(0, 0.1, 0);

  // ---- Load ----
  const draco = new DRACOLoader();
  draco.setDecoderPath(DRACO_PATH);
  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);

  let model = null;
  loader.load(
    '/assets/models/HouseTatami/casita.gltf',
    (gltf) => {
      model = gltf.scene;
      // scale FIRST, then re-center (centering before scaling drifts the
      // pivot off-origin once the scale is applied)
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3(); box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      model.scale.setScalar(3.4 / maxDim);
      const box2 = new THREE.Box3().setFromObject(model);
      const center2 = new THREE.Vector3(); box2.getCenter(center2);
      model.position.sub(center2);
      bob.add(model);
      renderer.render(scene, camera);
      onLoaded && onLoaded();
    },
    undefined,
    (err) => {
      console.error('Hero 3D model load error', err);
      onLoaded && onLoaded();
    }
  );

  // ---- Resize ----
  const ro = new ResizeObserver(() => {
    renderer.setSize(W(), H());
    camera.aspect = W() / H();
    camera.updateProjectionMatrix();
  });
  ro.observe(container);

  // ---- Animate ----
  const clock = new THREE.Clock();
  let raf = 0;
  function tick() {
    const t = clock.getElapsedTime();
    if (model) {
      bob.position.y = Math.sin(t * 0.9) * 0.12;
      bob.rotation.z = Math.sin(t * 0.6) * 0.025;
    }
    motes.rotation.y = t * 0.02;
    motes.position.y = Math.sin(t * 0.4) * 0.3;
    controls.update();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }
  tick();

  return function dispose() {
    cancelAnimationFrame(raf);
    ro.disconnect();
    controls.dispose();
    draco.dispose();
    renderer.dispose();
    if (renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  };
}

// ------------------------------------------------------------------
// Services — white Totoro (totoroWhite.gltf, draco-compressed)
// ------------------------------------------------------------------
export function initTotoro3D(container, { onLoaded } = {}) {
  if (!container) return () => {};

  const W = () => container.clientWidth || 1;
  const H = () => container.clientHeight || 1;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(34, W() / H(), 0.1, 100);
  camera.position.set(0, 0.4, 6);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(W(), H());
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  container.appendChild(renderer.domElement);

  // ---- Lighting (soft, warm) ----
  scene.add(new THREE.AmbientLight(0xfff4e6, 1.05));
  const key = new THREE.DirectionalLight(0xffe6c4, 1.9);
  key.position.set(3, 5, 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xcfe0ff, 0.6);
  fill.position.set(-4, 0, -2);
  scene.add(fill);
  const rim = new THREE.PointLight(0xe8a87c, 14, 30);
  rim.position.set(-2, 2, 3);
  scene.add(rim);

  // ---- Dust motes ----
  const moteCount = 70;
  const mg = new THREE.BufferGeometry();
  const pos = new Float32Array(moteCount * 3);
  for (let i = 0; i < moteCount; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 9;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
  }
  mg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const motes = new THREE.Points(mg, new THREE.PointsMaterial({
    color: 0xe8a87c, size: 0.045, transparent: true, opacity: 0.5,
    depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  scene.add(motes);

  // ---- Model group ----
  const bob = new THREE.Group();
  scene.add(bob);

  // ---- Controls ----
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.1;
  controls.minPolarAngle = Math.PI * 0.32;
  controls.maxPolarAngle = Math.PI * 0.62;
  controls.target.set(0, 0.1, 0);

  // ---- Load ----
  const draco = new DRACOLoader();
  draco.setDecoderPath(DRACO_PATH);
  const loader = new GLTFLoader();
  loader.setDRACOLoader(draco);

  let model = null;
  loader.load(
    '/assets/models/TotoroWhite/totoroWhite.gltf',
    (gltf) => {
      model = gltf.scene;
      // scale first, then re-center
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3(); box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      model.scale.setScalar(3.6 / maxDim);
      const box2 = new THREE.Box3().setFromObject(model);
      const center2 = new THREE.Vector3(); box2.getCenter(center2);
      model.position.sub(center2);
      bob.add(model);
      renderer.render(scene, camera);
      onLoaded && onLoaded();
    },
    undefined,
    (err) => {
      console.error('Totoro 3D load error', err);
      onLoaded && onLoaded();
    }
  );

  // ---- Resize ----
  const ro = new ResizeObserver(() => {
    renderer.setSize(W(), H());
    camera.aspect = W() / H();
    camera.updateProjectionMatrix();
  });
  ro.observe(container);

  // ---- Animate ----
  const clock = new THREE.Clock();
  let raf = 0;
  function tick() {
    const t = clock.getElapsedTime();
    if (model) {
      bob.position.y = Math.sin(t * 0.9) * 0.12;
      bob.rotation.z = Math.sin(t * 0.6) * 0.02;
    }
    motes.rotation.y = t * 0.02;
    motes.position.y = Math.sin(t * 0.4) * 0.25;
    controls.update();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }
  tick();

  return function dispose() {
    cancelAnimationFrame(raf);
    ro.disconnect();
    controls.dispose();
    draco.dispose();
    renderer.dispose();
    if (renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  };
}
