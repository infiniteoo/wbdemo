// image-viewer.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { CharacterDetails } from '../character-list/character-list.component';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

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
  @Output() displayConfirmation = new EventEmitter<boolean>();

  constructor(private http: HttpClient) {}

  confirmDelete(): void {
    this.displayConfirmation.emit(true);
    console.log('test');
  }
}
