// image-viewer.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { CharacterDetails } from '../character-list/character-list.component';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-image-viewer',
  imports: [CommonModule, NotificationComponent],
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css'],
  standalone: true,
})
export class ImageViewerComponent {
  @Input() imageUrl?: string;
  @Input() isLoading?: boolean;
  @Input() characterDetails?: CharacterDetails;
  @Output() displayConfirmation = new EventEmitter<boolean>();
  @Output() selectedCharacterForBattle = new EventEmitter<CharacterDetails>();
  @Output() message: string = '';
  @Output() color: string = 'black'; // Default color
  characterChosenForBattle: boolean = false;

  constructor(private http: HttpClient) {}

  confirmDelete(): void {
    this.displayConfirmation.emit(true);
    console.log('test');
  }
  confirmSelect(): void {
    this.selectedCharacterForBattle.emit(this.characterDetails);
    this.characterChosenForBattle = true;
    console.log('test');
  }
}
