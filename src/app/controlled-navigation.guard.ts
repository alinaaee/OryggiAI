import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NavigationStateService } from './navigation-state.service';

@Injectable({
  providedIn: 'root'
})
export class ControlledNavigationGuard implements CanActivate {
  constructor(private navService: NavigationStateService, private router: Router) {}

  canActivate(): boolean {
    if (this.navService.isAllowed()) {
      this.navService.setAllowed(false); //Reset after allowing
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false; //Block route
    }
  }
}
