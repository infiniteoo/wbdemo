import { Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Injectable({
  providedIn: 'root',
})
export class ThreeService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private gltfLoader!: GLTFLoader;
  private logo!: THREE.Object3D;
  private spotlight!: THREE.SpotLight;
  private spinSpeed: number = 0.015;

  constructor(private ngZone: NgZone) {}

  init(el: HTMLElement): void {
    // Create scene
    this.scene = new THREE.Scene();

    // Add a spotlight
    this.spotlight = new THREE.SpotLight(0xffffff);
    this.spotlight.position.set(0, 10, 10);
    this.spotlight.castShadow = true;
    this.scene.add(this.spotlight);

    // Create directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(1, 1, 1).normalize();
    this.scene.add(directionalLight);

    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.near = 0.1;
    this.camera.far = 100;

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    el.appendChild(this.renderer.domElement);

    // Load GLB model
    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.load('../assets/models/wb_shield.glb', (gltf) => {
      console.log(gltf);
      this.logo = gltf.scene;
      this.logo.scale.set(0.5, 0.5, 0.5);
      this.scene.add(this.logo);
    });

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize(), false);
    this.onWindowResize();
  }

  animate(): void {
    this.ngZone.runOutsideAngular(() => {
      const animateFunc = () => {
        requestAnimationFrame(animateFunc);
        this.renderer.render(this.scene, this.camera);

        // Rotate the logo automatically
        if (this.logo) {
          this.logo.rotation.y += this.spinSpeed;
        }
      };
      animateFunc();
    });
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
