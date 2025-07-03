// src/app/services/question.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionDto } from '../models/question.model';
import { environment } from '../../environments/environment';

export interface WizardSaveResponse {
  success: boolean;
}

@Injectable({ providedIn: 'root' })
export class QuestionService {

  private readonly apiUrl = environment.apiBaseUrl.endsWith('/') ? environment.apiBaseUrl : `${environment.apiBaseUrl}/`;

  constructor(private http: HttpClient) {}

  getAllQuestions(): Observable<QuestionDto[]> {
    return this.http.get<QuestionDto[]>(`${this.apiUrl}Master/pages/questions`);
  }

  saveAnswers(pageKey: string, answers: Record<string, string>): Observable<WizardSaveResponse> {
    return this.http.post<WizardSaveResponse>(`${this.apiUrl}Tenant_/wizard/${pageKey}`, answers);
  }
  
}
