// src/app/item.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'http://localhost:5000'; // Replace with your Python server URL

  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/items`);
  }

  getItemById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/items/${id}`);
  }

  createItem(item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/items`, item);
  }

  updateItem(id: string, item: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/items/${id}`, item);
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/items/${id}`);
  }
}
