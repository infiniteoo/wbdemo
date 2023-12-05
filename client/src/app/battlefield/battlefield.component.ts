import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterDetails } from '../character-list/character-list.component';

@Component({
  selector: 'app-battlefield',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './battlefield.component.html',
  styleUrl: './battlefield.component.css',
})
export class BattlefieldComponent {
  @Input() selectedCharacterForBattle?: CharacterDetails;
}
