import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WizardStateService } from './wizard-state.service';

export interface WizardSaveResponse {
  success: boolean;
}

@Injectable({ providedIn: 'root' })
export class WizardService {
 constructor(
   private http: HttpClient,
   private wizardState: WizardStateService
 ) {}

  /**
   * POSTs a page’s answers map to your tenant‐wizard endpoint.
   * @param pageKey  e.g. 'OrgBasics', 'Tech', 'Hours', 'Logs'
   * @param answers  mapping of questionID → answerText
   */
   savePage(
  pageKey: string,
  answers: Record<string, string>
): Observable<WizardSaveResponse> {
  // no tenant in the URL any more
  return this.http.post<WizardSaveResponse>(
    `/api/Tenant_/wizard/${pageKey}`,
    answers
  );
  }
}

