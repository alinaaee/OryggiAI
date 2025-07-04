import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { QuestionDto } from './models/question.model';;

@Injectable({
  providedIn: 'root'
})

export class OryggiAiService {
  private apiUrl = environment.apiBaseUrl;
  companyName = '';
  constructor(private http: HttpClient) {}

  //#region [login/signup]
  login(data: { email: string; password: string }): Observable<{ token: string; tenantId: number }> {
    return this.http.post<{ token: string; tenantId: number }>(`${this.apiUrl}Tenant_/login`, data);
  }

  signup(data: { email: string; companyName: string; password: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}Tenant_/signup`, data);
  }

  verifyOtp(data: { email: string; companyName: string; password: string; otp: string }): Observable<{ token: string; tenantId: number; message: string }> {
    return this.http.post<{ token: string; tenantId: number; message: string }>(`${this.apiUrl}Tenant_/verify-otp`, data);
  }
  //#endregion [login/signup]

  //#region [questions]
  getAllQuestions(): Observable<QuestionDto[]> {
    return this.http.get<QuestionDto[]>(`${this.apiUrl}Master/pages/questions`);
  }

  saveAnswers(pageKey: string, answers: Record<string, string>): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}Tenant_/wizard/${pageKey}`, answers);
  }
  //#endregion [questions]

  //#region [dashboard]
  getLatestAiResponse(): Observable<{ aiResponse: string }> {
    return this.http.get<{ aiResponse: string }>(`${this.apiUrl}Tenant_/prompt-batch/latest`);
  }

  getAiResponsesByDate(date: string): Observable<{ aiResponse: string }> {
    const params = new HttpParams().set('date', date);
    return this.http.get<{ aiResponse: string }>(`${this.apiUrl}Tenant_/prompt-batch`, { params });
  }
  //#endregion [dashboard]
}
