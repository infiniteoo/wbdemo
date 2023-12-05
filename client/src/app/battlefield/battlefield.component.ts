import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterDetails } from '../character-list/character-list.component';
import { NotificationComponent } from '../notification/notification.component';
import { HttpClient } from '@angular/common/http';

interface Character {
  // Define properties of your character, including stats

  name: string;
  house: string;
  intelligence: BigInteger;
  charisma: BigInteger;
  strength: BigInteger;
  characterClass: string;
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
  @Output() color: string = 'black'; // Default color
  displayMessage: boolean = false;
  @Input() characterList: CharacterDetails[] = [];

  constructor(private http: HttpClient) {}
  opponents: Character[] = [];
  ngOnInit(): void {
    this.http.get('http://localhost:5000/get-chars').subscribe((response) => {
      console.log('Server response:', response);
      this.opponents = response as Character[];
      this.opponents.map((opponent) => {
        // remove selected character from opponents
        if (opponent.name === this.selectedCharacterForBattle?.name) {
          this.opponents.splice(this.opponents.indexOf(opponent), 1);
        }
      });
    });

    console.log('opponents: ', this.opponents);
  }
}
