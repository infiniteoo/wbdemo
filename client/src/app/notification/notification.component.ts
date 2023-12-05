import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class NotificationComponent implements OnInit {
  @Input() message: string = '';
  @Input() color: string = 'black'; // Default color
  isVisible: boolean = false;

  ngOnInit(): void {
    this.show();
  }

  show(): void {
    this.isVisible = true;
    setTimeout(() => (this.isVisible = false), 3000);
  }
}
