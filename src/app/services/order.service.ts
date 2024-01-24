import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

const url = 'http://localhost:8080/store/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

    getOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(url);
    }

    createOrder(data: any): Observable<any> {
      return this.http.post(url, data);
    }

    updateOrder(id: number, data: any): Observable<any> {
      return this.http.put(`${url}/${id}`, data);
    }

    deleteOrder(id: number): Observable<any> {
      return this.http.delete(`${url}/${id}`);
    }

}