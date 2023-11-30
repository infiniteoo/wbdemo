// src/app/three.service.ts

import { Injectable, NgZone } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'; // Note the import syntax

@Injectable({
  providedIn: 'root',
})
export class ThreeService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private gltfLoader!: GLTFLoader;

  constructor(private ngZone: NgZone) {}

  init(el: HTMLElement): void {
    // Create scene
    this.scene = new THREE.Scene();
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
    this.camera.position.set(0, 0, 5); // Adjust the position
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.near = 0.1; // Adjust near clipping plane
    this.camera.far = 100; // Adjust far clipping plane
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    el.appendChild(this.renderer.domElement);

    // Load GLB model
    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.load('../assets/models/wb_shield.glb', (gltf) => {
      console.log(gltf);
      gltf.scene.scale.set(0.5, 0.5, 0.5);
      this.scene.add(gltf.scene);
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
