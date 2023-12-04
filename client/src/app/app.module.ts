// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ItemService } from './item.service';
import { ThreeService } from './three.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HousePickerComponent } from './house-picker/house-picker.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, CommonModule],
  providers: [ItemService, ThreeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
