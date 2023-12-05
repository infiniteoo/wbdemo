// src/app/three-viewer/three-viewer.component.ts

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThreeService } from '../three.service';

@Component({
  selector: 'app-three-viewer',
  template:
    '<div #rendererContainer class="flex justify-center items-center"></div>',
  styleUrls: ['./three-viewer.component.css'],
})
export class ThreeViewerComponent implements OnInit {
  @ViewChild('rendererContainer', { static: true })
  private rendererContainer!: ElementRef;

  constructor(private threeService: ThreeService) {}

  ngOnInit(): void {
    this.threeService.init(this.rendererContainer.nativeElement);
    this.threeService.animate();
  }
}
