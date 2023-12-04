// game-of-thrones-character-creator.component.ts
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GameOfThronesCharacter } from '../character.model';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HousePickerComponent } from '../house-picker/house-picker.component';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-got-char-creator',
  imports: [CommonModule, ReactiveFormsModule, HousePickerComponent],
  templateUrl: './got-char-creator.component.html',
  styleUrls: ['./got-char-creator.component.css'],
  standalone: true,
})
export class GotCharCreatorComponent implements OnInit {
  selectedHouse: string = '';
  isComponentVisible = false;
  @Input() hideUi: boolean = false;
  constructor(private fb: FormBuilder, private http: HttpClient) {
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
  }

  character!: GameOfThronesCharacter;

  ngOnInit(): void {
    console.log('this.hideUi in got char creator', this.hideUi);
    this.http.get('http://localhost:5000/get-chars').subscribe((response) => {
      console.log('Server response:', response);
    });
  }

  characterForm = this.fb.group({
    name: ['', Validators.required],
    house: ['', Validators.required],
    characterClass: ['', Validators.required],
    standalone: true,
  });

  classes: string[] = ['Warrior', 'Wizard', 'Rogue', 'Priest', 'Bard'];

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

  onSubmit(): void {
    console.log('Form submitted with character data:', this.character);

    this.http
      .post('http://localhost:5000/create-char', this.character)
      .subscribe((response) => {
        console.log('Server response:', response);
      });
  }
}
