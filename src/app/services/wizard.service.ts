import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WizardStateService } from './wizard-state.service';

export interface WizardSaveResponse {
  success: boolean;
}

@Injectable({ providedIn: 'root' })
export class WizardService {
  constructor( private http: HttpClient, private wizardState: WizardStateService ) {}

  savePage(pageKey: string, answers: Record<string, string>): Observable<WizardSaveResponse> {
  return this.http.post<WizardSaveResponse>(
      `/api/Tenant_/wizard/${pageKey}`,
      answers
    );
  }
}

