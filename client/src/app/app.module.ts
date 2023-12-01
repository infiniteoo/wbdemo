// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ThreeViewerComponent } from './three-viewer/three-viewer.component';
import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemService } from './item.service';
import { ThreeService } from './three.service';
import { EnterButtonComponent } from './enter-button/enter-button.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'; // Import RouterModule

@NgModule({
  declarations: [
    /*   ThreeViewerComponent,
    HomeComponent,
    ItemListComponent,
    EnterButtonComponent, */
    AppComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [ItemService, ThreeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
