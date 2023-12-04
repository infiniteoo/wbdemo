import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  selectedImageUrl?: string;
  isLoading: boolean = false;

  @Output() characterSelected = new EventEmitter<string>(); // Add this line
  @Output() imageLoaded = new EventEmitter<string>(); // Emitting string (image URL)

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.http.get('http://localhost:5000/get-chars').subscribe((response) => {
      console.log('Server response:', response);
      this.characters = response as any[];
    });
  }

  onCharacterClick(character: Character): void {
    this.characterSelected.emit(); // Emit event when character is clicked

    this.http
      .post<ImageResponse>('http://localhost:5000/get-image', character)
      .subscribe({
        next: (response) => {
          // Emit the image URL to the parent component
          this.imageLoaded.emit(response.url);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error sending character stats', error);
          this.isLoading = false;
        },
      });
  }

  selectCharacter(character: any): void {
    console.log('Selected character:', character);
  }
}