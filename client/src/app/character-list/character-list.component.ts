import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../notification/notification.component';

interface Character {
  // Define properties of your character, including stats

  name: string;
  house: string;
  intelligence: BigInteger;
  charisma: BigInteger;
  strength: BigInteger;
  characterClass: string;
}

interface ImageResponse {
  url: string;
}

export interface CharacterDetails {
  name: string;
  house: string;
  characterClass: string;
  intelligence: BigInteger;
  charisma: BigInteger;
  strength: BigInteger;
}

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  standalone: true,
  imports: [CommonModule, NotificationComponent],
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  selectedImageUrl?: string;
  isLoading: boolean = false;
  characterChosenForBattle: string = '';

  @Output() characterSelected = new EventEmitter<string>();
  @Output() imageLoaded = new EventEmitter<string>(); // Emitting string (image URL)
  @Output() characterDetails = new EventEmitter<CharacterDetails>();

  constructor(private http: HttpClient) {}
  @Output() message: string = '';
  @Output() color: string = 'black'; // Default color
  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.http.get('http://localhost:5000/get-chars').subscribe((response) => {
      console.log('Server response:', response);
      this.characters = response as Character[];
    });
  }

  onCharacterClick(character: Character): void {
    this.characterSelected.emit(character.name); // Emit event when character is clicked

    this.http
      .post<ImageResponse>('http://localhost:5000/get-image', character)
      .subscribe({
        next: (response) => {
          this.selectedImageUrl = response.url;
          this.isLoading = false;
          this.imageLoaded.emit(response.url);
          this.characterDetails.emit(character); // Emit character details
        },
        error: (error) => {
          console.error('Error sending character stats', error);
          this.isLoading = false;
        },
      });
  }

  selectCharacter(character: Character): void {
    console.log('Selected character:', character);
    this.message = character.name + ' selected';
    this.color = 'gold'; // Or any logic to determine color
    // Emit event or handle notification display logic
    this.characterChosenForBattle = character.name;
    this.selectCharacter(character);
  }
}
