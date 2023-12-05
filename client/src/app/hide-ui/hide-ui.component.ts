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
  @Output() hideCharacterCreator = new EventEmitter<boolean>();
  @Output() displayBattlefield = new EventEmitter<boolean>();
  @Input() selectedCharacterForBattle?: CharacterDetails;
  showCharacterCreator = false;
  showBattlefield = false;

  bootstrapShield = bootstrapShield;
  hideBoth = false;

  ngOnInit(): void {
    this.hideCharacterCreator.emit(false);
    this.displayBattlefield.emit(false);
  }

  handleCharacterCreatorDisplay(): void {
    this.showCharacterCreator = !this.showCharacterCreator;
    this.hideCharacterCreator.emit(this.showCharacterCreator);
    console.log(
      'should cc be displayed (in hide ui) this.showCharacterCreator: ',
      this.showCharacterCreator
    );
    console.log(
      'should battlefield be displayed (in hide ui) this.showBattlefield: ',
      this.showBattlefield
    );
  }

  handleClose(): void {
    this.showCharacterCreator = false;
    this.showBattlefield = false;

    this.hideCharacterCreator.emit(this.showCharacterCreator);
    this.displayBattlefield.emit(this.showBattlefield);

    console.log(
      'should cc be displayed (in hide ui): this.showCharacterCreator ',
      this.showCharacterCreator
    );
    console.log(
      'should battlefield be displayed (in hide ui): this.showBattlefield ',
      this.showBattlefield
    );
  }

  showBattlefieldHandler(): void {
    this.showBattlefield = !this.showBattlefield;
    this.displayBattlefield.emit(this.showBattlefield);
    console.log(
      'should battlefield be displayed (in hide ui): this.battlfieldIsHidden ',
      this.showBattlefield
    );
    console.log(
      'should cc be displayed (in hide ui): this.showCharacterCreator ',
      this.showCharacterCreator
    );
  }
}
