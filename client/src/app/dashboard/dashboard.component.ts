import { Component } from '@angular/core';
import { HousePickerComponent } from '../house-picker/house-picker.component';
import { GotCharCreatorComponent } from '../got-char-creator/got-char-creator.component';
import { CharacterListComponent } from '../character-list/character-list.component';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HousePickerComponent,
    GotCharCreatorComponent,
    CharacterListComponent,
    ImageViewerComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  selectedImageUrl?: string;

  onCharacterSelected(url: string): void {
    this.selectedImageUrl = url;
  }
}
