// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ThreeViewerComponent } from '../three-viewer/three-viewer.component';
import { HomeComponent } from '../home/home.component';
import { ItemListComponent } from '../item-list/item-list.component';
import { CommonModule } from '@angular/common';
import { HousePickerComponent } from './house-picker.component';

@NgModule({
  declarations: [HomeComponent, HousePickerComponent],
  imports: [CommonModule, HttpClientModule, BrowserModule],

  bootstrap: [HomeComponent, ThreeViewerComponent, HousePickerComponent],
  exports: [],
})
export class HomeModule {}
