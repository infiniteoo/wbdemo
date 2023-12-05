import { Component, Input, EventEmitter, ViewChild } from '@angular/core';
import { HousePickerComponent } from '../house-picker/house-picker.component';
import { GotCharCreatorComponent } from '../got-char-creator/got-char-creator.component';
import { CharacterListComponent } from '../character-list/character-list.component';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { HideUiComponent } from '../hide-ui/hide-ui.component';
import { CommonModule } from '@angular/common';
import { ConfirmationBoxComponent } from '../confirmation-box/confirmation-box.component';
import { BattlefieldComponent } from '../battlefield/battlefield.component';

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
    HideUiComponent,
    CommonModule,
    ConfirmationBoxComponent,
    BattlefieldComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  @ViewChild(CharacterListComponent) characterList!: CharacterListComponent;

  selectedImageUrl?: string;
  isLoading: boolean = false;
  selectedCharacterDetails?: CharacterDetails;
  @Input() hideUi: boolean = false;
  @Input() displayConfirmation: boolean = false;
  @Input() selectedCharacterForBattle?: CharacterDetails;
  @Input() hideBattlefield: boolean = true;

  onDisplayConfirmation(displayConfirmation: boolean): void {
    console.log('onDisplayConfirmation', this.displayConfirmation);
    this.displayConfirmation = displayConfirmation;
  }

  onHideBattlefield(hideBattlefield: boolean): void {
    this.hideBattlefield = hideBattlefield;
    console.log('onHideBattlefield', this.hideBattlefield);
  }

  onHideOverlay(hideUi: boolean): void {
    this.hideUi = hideUi;
    console.log('onHideOverlay', hideUi);
  }

  onSelectedCharacterForBattle(
    selectedCharacterForBattle: CharacterDetails
  ): void {
    console.log('onSelectedCharacterForBattle', selectedCharacterForBattle);
    this.selectedCharacterForBattle = selectedCharacterForBattle;
  }

  onCharacterSelected(url?: string): void {
    this.isLoading = true;
    this.selectedImageUrl = url;
  }
  onNewCharacterCreated(): void {
    this.updateCharacterList();
  }

  onCharacterDeleted(): void {
    this.updateCharacterList();
  }

  onImageLoaded(url: string): void {
    this.selectedImageUrl = url;
    this.isLoading = false;
  }

  onCharacterDetailsReceived(details: CharacterDetails): void {
    this.selectedCharacterDetails = details;
  }

  updateCharacterList(): void {
    this.characterList.loadCharacters();
  }
}
