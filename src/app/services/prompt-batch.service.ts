// src/app/services/prompt-batch.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LatestAiResponse {
  aiResponse: string;
}

@Injectable({ providedIn: 'root' })
export class PromptBatchService {
private readonly apiUrl = environment.apiBaseUrl;
private readonly url = `${this.apiUrl}Tenant_/prompt-batch/latest`;

  constructor(private http: HttpClient) {}

  getLatestAiResponse(): Observable<LatestAiResponse> {
    return this.http.get<LatestAiResponse>(this.url);
  }
}
