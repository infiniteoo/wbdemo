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
  myHitPoints: number = 100;
  opponentHitPoints: number = 100;
  fadeOthers: boolean = false;

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

      this.chosenFighter = this.selectedCharacterForBattle as Character;

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
  attackOpponent(): void {
    const damage = this.calculateDamage();
    this.opponentHitPoints = Math.max(this.opponentHitPoints - damage, 0);
    this.checkGameOver();

    // Opponent's turn to respond
    setTimeout(() => {
      this.opponentAttack();
    }, 1000); // Delay for the opponent's response
  }

  opponentAttack(): void {
    const damage = this.calculateDamage();
    this.myHitPoints = Math.max(this.myHitPoints - damage, 0);
    this.checkGameOver();
  }

  calculateDamage(): number {
    return Math.floor(Math.random() * 20) + 1; // Random damage between 1 and 20
  }

  checkGameOver(): void {
    if (this.myHitPoints <= 0) {
      alert('Game Over! You lost.');
      // Handle game over logic
    } else if (this.opponentHitPoints <= 0) {
      alert('Congratulations! You won!');
      // Handle victory logic
    }
  }

  chooseRandomOpponent(): void {
    const randomIndex = Math.floor(Math.random() * this.opponents.length);
    this.chosenOpponent = this.opponents[randomIndex];

    this.fadeOthers = true;
    this.currentDisplayIndex = -1; // Reset the index to ensure no card has 'active' class
    this.characterChosenForBattle = true;
    this.currentDisplayIndex = this.opponents.indexOf(this.chosenOpponent);
    // Delay to allow fade effect
    setTimeout(() => {
      this.fadeOthers = false; // Reset the fade effect
      // Highlight the chosen opponent

      this.positionCharacters();
    }, 1000); // Adjust timing as needed
  }

  positionCharacters(): void {
    // Logic to position characters
    // You can use this method to adjust the layout, show/hide elements, etc.
  }
}
