// enter-button.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-button',

  template: `
    <button
      class="bg-black text-white px-4 py-2 text-4xl rounded hover:font-bold hover:tracking-[6px]"
      (click)="navigateToDashboard()"
    >
      enter
    </button>
  `,
})
export class EnterButtonComponent {
  constructor(private router: Router) {}

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
