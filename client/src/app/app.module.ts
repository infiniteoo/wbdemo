// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ThreeViewerComponent } from './three-viewer/three-viewer.component';
import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemService } from './item.service';
import { ThreeService } from './three.service';

@NgModule({
  declarations: [AppComponent, ItemListComponent, ThreeViewerComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [ItemService, ThreeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
