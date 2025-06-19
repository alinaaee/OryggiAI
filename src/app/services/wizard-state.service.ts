import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WizardStateService {
  private state: Record<string, Record<string, any>> = {};
  private tenantId: string | null = null;

    /** Remember the current tenant for all subsequent API calls */
setTenantId(id: string): void {
   this.tenantId = id;
 }

 /** Retrieve the current tenant ID (or null if not set) */
 getTenantId(): string | null {
   return this.tenantId;
 }


  setAnswers(pageKey: string, answers: Record<string, any>): void {
    this.state[pageKey] = { ...answers };
  }

  getAnswers(pageKey: string): Record<string, any> | undefined {
    return this.state[pageKey];
  }

  getAllAnswers(): Record<string, any> {
    return Object.values(this.state)
      .reduce((acc, answers) => ({ ...acc, ...answers }), {});
  }

  clear(): void {
    this.state = {};
    this.tenantId = null;

  }
}
