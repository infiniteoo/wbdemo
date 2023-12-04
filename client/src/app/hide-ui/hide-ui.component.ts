import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hide-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hide-ui.component.html',
  styleUrl: './hide-ui.component.css',
})
export class HideUiComponent {
  @Output() hideUi = new EventEmitter<boolean>();
  isHidden = false;

  hideHandler(): void {
    this.isHidden = !this.isHidden;
    this.hideUi.emit(this.isHidden);
    console.log('hideHandler', this.isHidden);
  }
}
