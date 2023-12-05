// image-viewer.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CharacterDetails } from '../character-list/character-list.component';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  refreshImage() {
    this.http.get('http://localhost:5000/regenerate').subscribe((data) => {
      console.log(data);
    });
  }
}
