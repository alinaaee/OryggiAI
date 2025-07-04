import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationStateService {

  private allowedNavigation = false;

  setAllowed(state: boolean) {   //to update the flag
    this.allowedNavigation = state;
  }

  isAllowed(): boolean {    //to read the current flag status
    return this.allowedNavigation;
  }
}
