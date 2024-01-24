import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:8080/store/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  summarize(format: string): Observable<string> {
    return this.http.get<string>(`${apiUrl}/${format}`);
  }
}
