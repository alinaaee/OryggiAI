// src/app/auth/auth.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { WizardStateService } from '../services/wizard-state.service';
import { environment } from '../../environments/environment';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ CommonModule, FormsModule, HttpClientModule, RouterModule, MatFormFieldModule, MatIconModule, MatInputModule, MatLabel, MatButtonModule, MatProgressSpinnerModule ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  //#region [variables]
  logo: string = 'assets/Logo/logo-Oryggi.png';
  mode: 'login' | 'signup' | 'verifyOtp' = 'login';
  // login fields
  loginEmail = '';
  loginPassword = '';
  loginMessage = '';
  // signup fields
  signupEmail = '';
  signupCompany = '';
  signupPassword = '';
  signupMessage = '';
  // otp field
  otp = '';
  verifyMessage = '';
  loading = false;
  otpLoading = false;
  signupLoading = false;
  //#endregion [variables]
    private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private router: Router, private wizardState: WizardStateService) {}

  login() {
    this.loginMessage = '';
    this.loading = true;
    this.http.post<{ token: string; tenantId: number }>( `${this.apiUrl}Tenant_/login`, {
      email: this.loginEmail,
      password: this.loginPassword
    }).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('tenantId', res.tenantId.toString());
        this.router.navigate(['/dashboard']);
        this.loading = false;
      },
      error: err => {
        this.loginMessage = err.error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }


  signup() {
    this.signupMessage = '';
    this.signupLoading = true;
    this.http.post<{ message: string }>(this.apiUrl +'Tenant_/signup', {
      email: this.signupEmail,
      companyName: this.signupCompany,
      password: this.signupPassword
    }).subscribe({
      next: res => {
        this.signupMessage = res.message;
        this.mode = 'verifyOtp';
        this.signupLoading = false;
      },
      error: err => {
        this.signupMessage = err.error?.message || 'Signup failed';
        this.signupLoading = false; 
      }
    });
  }

  verifyOtp() {
    this.verifyMessage = '';
    this.otpLoading = true;
    this.http.post<{ token: string; tenantId: number; message: string }>(this.apiUrl +'Tenant_/verify-otp', {
      email: this.signupEmail,
      companyName: this.signupCompany,
      password: this.signupPassword,
      otp: this.otp
    }).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('tenantId', res.tenantId.toString());
        this.wizardState.setTenantId(res.tenantId.toString());
        this.router.navigate(['/questions']);
        this.otpLoading = false; 
      },
      error: err => {
        this.verifyMessage = err.error?.message || 'OTP verification failed';
        this.otpLoading = false; 
      }
    });
  }

}