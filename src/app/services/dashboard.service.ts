import { Injectable } from '@angular/core';
import { HttpClient, HttpParams }     from '@angular/common/http';
import { Observable }     from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class DashboardService {
  apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getLatestResponse(): Observable<string> {
    return this.http.get<string>(this.apiUrl + 'Tenant_/dashboard/latest');
  }

  getAiResponsesByDate(date: string): Observable<{ aiResponses: string[] }> {
    const params = new HttpParams().set('date', date);
    return this.http.get<{ aiResponses: string[] }>(`${this.apiUrl}Tenant_/prompt-batch`, { params });
  }
  
}
