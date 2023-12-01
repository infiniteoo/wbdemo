import { Component } from '@angular/core';
import { ThreeViewerComponent } from '../three-viewer/three-viewer.component';
import { EnterButtonComponent } from '../enter-button/enter-button.component';
import { NgModule } from '@angular/core';
import { HomeModule } from './home.module'; // adjust the path

@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
