import { Injectable } from '@angular/core';
import { HttpClient }     from '@angular/common/http';
import { Observable }     from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  /** Fetch just the single latest AIResponse string */
  getLatestResponse(): Observable<string> {
    return this.http.get<string>('/api/Tenant_/dashboard/latest');
  }
}
