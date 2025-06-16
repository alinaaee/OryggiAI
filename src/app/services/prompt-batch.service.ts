// src/app/services/prompt-batch.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LatestAiResponse {
  aiResponse: string;
}

@Injectable({ providedIn: 'root' })
export class PromptBatchService {
  private readonly url = '/api/Tenant_/prompt-batch/latest';

  constructor(private http: HttpClient) {}

  /** Fetches the single most recent AI response JSON blob */
  getLatestAiResponse(): Observable<LatestAiResponse> {
    return this.http.get<LatestAiResponse>(this.url);
  }
}
