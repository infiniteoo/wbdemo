// image-viewer.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
    </div>
    <img
      *ngIf="!isLoading && imageUrl"
      [src]="imageUrl"
      alt="Character Image"
    />
  `,
  styleUrls: ['./image-viewer.component.css'],
  standalone: true,
})
export class ImageViewerComponent {
  @Input() imageUrl?: string;
  @Input() isLoading?: boolean;
}
