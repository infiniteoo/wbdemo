// game-of-thrones-character-creator.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameOfThronesCharacter } from '../character.model';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HousePickerComponent } from '../house-picker/house-picker.component';

@Component({
  selector: 'app-got-char-creator',
  imports: [CommonModule, ReactiveFormsModule, HousePickerComponent],
  templateUrl: './got-char-creator.component.html',
  styleUrls: ['./got-char-creator.component.css'],
  standalone: true,
})
export class GotCharCreatorComponent implements OnInit {
  selectedHouse: string = '';

  constructor(private fb: FormBuilder) {
    this.character = {
      name: '',
      house: '',
      characterClass: '',
      strength: 0,
      intelligence: 0,
      charisma: 0,
    };
  }

  onHouseSelected(house: string): void {
    this.character.house = house;
    console.log('Selected house in parent component:', house);
    console.log('this.character.hosue', this.character.house);
    // Perform additional actions based on the selected house.
  }
  character!: GameOfThronesCharacter;
  ngOnInit(): void {
    // Initialization logic can go here if needed
  }

  characterForm = this.fb.group({
    name: ['', Validators.required],
    house: ['', Validators.required],
    characterClass: ['', Validators.required],
    standalone: true,
  });

  houses: string[] = ['House Stark', 'House Lannister', 'House Targaryen'];

  classes: string[] = ['Warrior', 'Wizard', 'Rogue'];

  generateRandomStats() {
    this.character = {
      name: this.characterForm.get('name')?.value || '',
      house: this.character.house || '',
      characterClass: this.characterForm.get('characterClass')?.value || '',
      strength: Math.floor(Math.random() * 20) + 1,
      intelligence: Math.floor(Math.random() * 20) + 1,
      charisma: Math.floor(Math.random() * 20) + 1,
    } as GameOfThronesCharacter;
  }
}
