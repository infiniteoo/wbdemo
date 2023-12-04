import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-house-picker',
  templateUrl: './house-picker.component.html',
  styleUrls: ['./house-picker.component.css'],
  standalone: true,
})
export class HousePickerComponent {
  gotImages: Array<string> = [
    '../../assets/houses/got1.svg',
    '../../assets/houses/got2.svg',
    '../../assets/houses/got3.svg',
    '../../assets/houses/got4.svg',
    '../../assets/houses/got5.svg',
    '../../assets/houses/got6.svg',
    '../../assets/houses/got7.svg',
    '../../assets/houses/got8.svg',
  ];

  selectHouse(house: string): void {
    console.log('Selected house:', house);
    // You can perform additional actions here based on the selected house.
  }
}
