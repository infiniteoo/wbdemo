import { Component } from '@angular/core';
import { HousePickerComponent } from '../house-picker/house-picker.component';
import { GotCharCreatorComponent } from '../got-char-creator/got-char-creator.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HousePickerComponent, GotCharCreatorComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
