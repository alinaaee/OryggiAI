import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuestionDto } from '../models/question.model';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private readonly API = '/api/Master/pages';

  constructor(private http: HttpClient) {}

  getQuestionsForPage(pageKey: string): Observable<QuestionDto[]> {
    return this.http.get<QuestionDto[]>(`${this.API}/${pageKey}/questions`);
  }
}
