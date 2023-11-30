// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemService } from './item.service';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    // Add other components here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // Add other modules here
  ],
  providers: [ItemService],
  bootstrap: [AppComponent],
})
export class AppModule {}
