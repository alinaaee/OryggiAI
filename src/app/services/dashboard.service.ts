import { Injectable } from '@angular/core';
import { HttpClient, HttpParams }     from '@angular/common/http';
import { Observable }     from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class DashboardService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.apiBaseUrl;
  companyName = '';

  getLatestAiResponse(): Observable<{ aiResponse: string }> {
    return this.http.get<{ aiResponse: string }>(`${this.apiUrl}Tenant_/prompt-batch/latest`);
  }

  getAiResponsesByDate(date: string): Observable<{ aiResponse: string }> {
    const params = new HttpParams().set('date', date);
    return this.http.get<{ aiResponse: string }>(`${this.apiUrl}Tenant_/prompt-batch`, { params });
  }

}
