import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-viewer',
  template: `<img *ngIf="imageUrl" [src]="imageUrl" alt="Character Image" />`,
  styleUrls: ['./image-viewer.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ImageViewerComponent {
  @Input() imageUrl?: string;
}
