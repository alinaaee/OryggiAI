// src/app/services/question.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionDto } from '../models/question.model';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class QuestionService {

private readonly apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}

  getQuestionsForPage(pageKey: string): Observable<QuestionDto[]> {
    const base = this.apiUrl.endsWith('/') ? this.apiUrl : `${this.apiUrl}/`;
    return this.http.get<QuestionDto[]>(`${base}Master/pages/${pageKey}/questions`);
  }
}
