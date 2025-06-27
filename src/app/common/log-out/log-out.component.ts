import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-log-out',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.css'
})
export class LogOutComponent {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  confirmLogout(): void {
    Swal.fire({
      title: 'Confirm Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout();
      }
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tenantId');
    
    this.router.navigate(['/login']).then(() => {
      this.snackBar.open('You have been successfully logged out.', 'Close', {
        duration: 3000
      });
    });
  }
}
