import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

const url = 'http://localhost:8080/store/items';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) {}

    getItems(): Observable<Item[]> {
        return this.http.get<Item[]>(url);
    }

    createItem(data: any): Observable<any> {
      return this.http.post(url, data);
    }

    updateItem(id: number, data: any): Observable<any> {
      return this.http.put(`${url}/${id}`, data);
    }

    deleteItem(id: number): Observable<any> {
      return this.http.delete(`${url}/${id}`);
    }

}