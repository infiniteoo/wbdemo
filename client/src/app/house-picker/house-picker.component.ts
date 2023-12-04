import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HouseImage {
  name: string;
  image: string;
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
      name: 'House Baratheon',
      image: '../../assets/houses/got1.svg',
    },
    {
      name: 'House Tyrell',
      image: '../../assets/houses/got2.svg',
    },
    {
      name: 'House Stark',
      image: '../../assets/houses/got3.svg',
    },
    {
      name: 'House Lannister',
      image: '../../assets/houses/got4.svg',
    },
    {
      name: 'House Arryn',
      image: '../../assets/houses/got5.svg',
    },
    {
      name: 'House Tyrell',
      image: '../../assets/houses/got6.svg',
    },
    {
      name: 'House Targaryen',
      image: '../../assets/houses/got7.svg',
    },
    {
      name: 'House Greyjoy',
      image: '../../assets/houses/got8.svg',
    },
  ];

  selectHouse(house: HouseImage): void {
    console.log('Selected house:', house.name);
    // set variable to define what the house selected is
    this.houseSelected.emit(house.name);
  }
}
