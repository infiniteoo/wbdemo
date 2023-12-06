import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterDetails } from '../character-list/character-list.component';
import { NotificationComponent } from '../notification/notification.component';
import { HttpClient } from '@angular/common/http';

interface Character {
  name: string;
  house: string;
  intelligence: BigInteger;
  charisma: BigInteger;
  strength: BigInteger;
  characterClass: string;
  image_url: string;
}

@Component({
  selector: 'app-battlefield',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './battlefield.component.html',
  styleUrl: './battlefield.component.css',
})
export class BattlefieldComponent {
  @Input() selectedCharacterForBattle?: CharacterDetails;
  @Output() message: string = '';
  @Output() color: string = 'black';
  displayMessage: boolean = false;
  @Input() characterList: CharacterDetails[] = [];
  characterChosenForBattle = false;
  currentDisplayIndex = 0;
  chosenOpponent: Character = {} as Character;
  chosenFighter: Character = {} as Character;
  constructor(private http: HttpClient) {}
  opponents: Character[] = [];

  ngOnInit(): void {
    this.http.get('http://localhost:5000/get-chars').subscribe((response) => {
      const allCharacters = response as Character[];

      if (this.selectedCharacterForBattle) {
        this.opponents = allCharacters.filter(
          (opponent) => opponent.name !== this.selectedCharacterForBattle?.name
        );
      } else {
        this.opponents = allCharacters;
      }

      this.startOpponentSelection(3000);
    });
  }

  startOpponentSelection(timeLimit: number): void {
    const interval = 100;
    let intervalId = setInterval(() => {
      this.currentDisplayIndex =
        (this.currentDisplayIndex + 1) % this.opponents.length;
    }, interval);

    setTimeout(() => {
      clearInterval(intervalId); // Stop the cycling
      this.chooseRandomOpponent();
    }, timeLimit);
  }

  chooseRandomOpponent(): void {
    const randomIndex = Math.floor(Math.random() * this.opponents.length);
    this.chosenOpponent = this.opponents[randomIndex];
    this.currentDisplayIndex = randomIndex;
    this.characterChosenForBattle = true;
  }
}
