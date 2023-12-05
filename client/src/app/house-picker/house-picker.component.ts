import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HouseImage {
  name: string;
  image: string;
  selected: boolean; // Add a property to track selection
}

@Component({
  imports: [CommonModule],
  selector: 'app-house-picker',
  templateUrl: './house-picker.component.html',
  styleUrls: ['./house-picker.component.css'],
  standalone: true,
})
export class HousePickerComponent {
  @Output() houseSelected: EventEmitter<string> = new EventEmitter<string>();

  gotImages: HouseImage[] = [
    {
      name: 'Greyjoy',
      image: '../../assets/houses/got8.svg',
      selected: false,
    },

    {
      name: 'Tyrell',
      image: '../../assets/houses/got2.svg',
      selected: false,
    },
    {
      name: 'Stark',
      image: '../../assets/houses/got3.svg',
      selected: false,
    },
    {
      name: 'Lannister',
      image: '../../assets/houses/got4.svg',
      selected: false,
    },
    {
      name: 'Arryn',
      image: '../../assets/houses/got5.svg',
      selected: false,
    },
    {
      name: 'Baratheon',
      image: '../../assets/houses/got1.svg',
      selected: false,
    },
    {
      name: 'Tyrell',
      image: '../../assets/houses/got6.svg',
      selected: false,
    },
    {
      name: 'Targaryen',
      image: '../../assets/houses/got7.svg',
      selected: false,
    },
  ];

  selectHouse(house: HouseImage): void {
    console.log('Selected house:', house.name);

    this.gotImages.forEach((img) => (img.selected = img === house));

    this.houseSelected.emit(house.name);
  }
}
