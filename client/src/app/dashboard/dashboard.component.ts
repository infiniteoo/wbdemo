import { Component } from '@angular/core';
import { HousePickerComponent } from '../house-picker/house-picker.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HousePickerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
