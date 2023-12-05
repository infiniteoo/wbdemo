import { Component, Input } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { akarDoubleSword } from '@ng-icons/akar-icons';
import { bootstrapShield } from '@ng-icons/bootstrap-icons';
import { CharacterDetails } from '../character-list/character-list.component';

@Component({
  selector: 'app-hide-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hide-ui.component.html',
  styleUrl: './hide-ui.component.css',
})
export class HideUiComponent {
  akarDoubleSword = akarDoubleSword;
  @Output() hideUi = new EventEmitter<boolean>();
  @Output() hideBattlefield = new EventEmitter<boolean>();
  isHidden = false;
  battlefieldIsHidden = true;
  bootstrapShield = bootstrapShield;
  @Input() selectedCharacterForBattle?: CharacterDetails;

  ngOnInit(): void {}

  hideHandler(): void {
    this.isHidden = !this.isHidden;
    this.hideUi.emit(this.isHidden);
    console.log('hideHandler', this.isHidden);
  }

  hideBattlefieldHandler(): void {
    this.battlefieldIsHidden = !this.battlefieldIsHidden;
    this.hideBattlefield.emit(this.battlefieldIsHidden);
    console.log('hideBattlefieldHandler', this.battlefieldIsHidden);
  }
}
