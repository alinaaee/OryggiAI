import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WizardStateService {
  private tenantId: string | null = null;

  setTenantId(id: string): void {
    this.tenantId = id;
  }

  getTenantId(): string | null {
    return this.tenantId;
  }
}
