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
  @Output() characterSelected = new EventEmitter<string>(); // Add this line

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
    // ... existing logic ...
    this.http
      .post<ImageResponse>('http://localhost:5000/get-image', character)
      .subscribe({
        next: (response) => {
          this.characterSelected.emit(response.url); // Emit the image URL
          // ... other logic ...
        },
        error: (error) => {
          console.error('Error sending character stats', error);
        },
      });
  }

  selectCharacter(character: any): void {
    console.log('Selected character:', character);
  }
}
