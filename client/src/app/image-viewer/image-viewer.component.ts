// image-viewer.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CharacterDetails } from '../character-list/character-list.component'; // Adjust the path as needed

@Component({
  selector: 'app-image-viewer',
  imports: [CommonModule],
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css'],
  standalone: true,
})
export class ImageViewerComponent {
  @Input() imageUrl?: string;
  @Input() isLoading?: boolean;
  @Input() characterDetails?: CharacterDetails;
}
