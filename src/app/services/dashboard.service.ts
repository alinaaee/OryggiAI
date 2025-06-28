import { Injectable } from '@angular/core';
import { HttpClient }     from '@angular/common/http';
import { Observable }     from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class DashboardService {
  apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getLatestResponse(): Observable<string> {
    return this.http.get<string>(this.apiUrl + 'Tenant_/dashboard/latest');
  }
}
