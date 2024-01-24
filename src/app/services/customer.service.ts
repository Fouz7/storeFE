import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Customer } from '../models/customer.model';


const url = 'http://localhost:8080/store/customers';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  constructor(private http: HttpClient) {}

    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(url);
    }

    createCustomer(data: any): Observable<any> {
      return this.http.post(url, data);
    }

    updateCustomer(id: number, data: any): Observable<any> {
      return this.http.put(`${url}/${id}`, data).pipe(
        tap(response => console.log('HTTP response:', response))
      );
    }

    deleteCustomer(id: number): Observable<any> {
      return this.http.delete(`${url}/${id}`);
    }

}
