import { Component } from '@angular/core';
import { HousePickerComponent } from '../house-picker/house-picker.component';
import { GotCharCreatorComponent } from '../got-char-creator/got-char-creator.component';
import { CharacterListComponent } from '../character-list/character-list.component';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';

export interface CharacterDetails {
  name: string;
  house: string;
  characterClass: string;
  intelligence: BigInteger;
  charisma: BigInteger;
  strength: BigInteger;
}

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
  isLoading: boolean = false;
  selectedCharacterDetails?: CharacterDetails;

  onCharacterSelected(url?: string): void {
    this.isLoading = true;
    this.selectedImageUrl = url; // Use the URL if needed
  }

  onImageLoaded(url: string): void {
    this.selectedImageUrl = url;
    this.isLoading = false;
  }

  onCharacterDetailsReceived(details: CharacterDetails): void {
    this.selectedCharacterDetails = details;
  }
}
