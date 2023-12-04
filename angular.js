// Install Angular CLI:
// npm install -g @angular/cli


// Create a New Angular Project:
// ng new my-angular-project
// cd my-angular-project


// Create a Component:
// ng generate component my-component

// Modify the Component (src/app/my-component/my-component.component.ts):
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent {
  title = 'My Angular Project';
}


// Use the Component in the App (src/app/app.component.html):
// <h1>{{ title }}</h1>
// <app-my-component></app-my-component>


// Run the Angular App:
// ng serve

// Create a Service:
// ng generate service my-service

// Modify the Service (src/app/my-service.service.ts):
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {
  getData(): string {
    return 'Data from the service';
  }
}


// Use the Service in the Component (src/app/my-component/my-component.component.ts):
import { Component } from '@angular/core';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponentComponent {
  title = 'My Angular Project';
  serviceData: string;

  constructor(private myService: MyServiceService) {
    this.serviceData = this.myService.getData();
  }
}