// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ThreeViewerComponent } from '../three-viewer/three-viewer.component';
import { HomeComponent } from '../home/home.component';
import { ItemListComponent } from '../item-list/item-list.component';
import { ItemService } from '../item.service';
import { ThreeService } from '../three.service';
import { EnterButtonComponent } from '../enter-button/enter-button.component';

@NgModule({
  declarations: [
    ItemListComponent,
    ThreeViewerComponent,
    EnterButtonComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [ItemService, ThreeService],
  bootstrap: [HomeComponent, ThreeViewerComponent, EnterButtonComponent],
  exports: [],
})
export class HomeModule {}
