import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs';

export interface QuestionMaster {
  questionId:   string;
  questionText: string;
  isActive:     boolean;
}

@Injectable({ providedIn: 'root' })
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestions(ids: string[]): Observable<QuestionMaster[]> {
    const qs = ids.map(id => `ids=${encodeURIComponent(id)}`).join('&');
    const url = `https://localhost:7231/api/Master_/questionslist?${qs}`;
    console.log('Fetching questions from:', url);
    return this.http.get<QuestionMaster[]>(url);
  }
}
