// src/app/auth/auth.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { WizardStateService } from '../services/wizard-state.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
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
  private apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient, private router: Router, private wizardState: WizardStateService) {}

  login() {
    this.loginMessage = '';
    this.http.post<{ token: string; tenantId: number }>( `${this.apiUrl}Tenant_/login`, {
      email: this.loginEmail,
      password: this.loginPassword
    }).subscribe({
      next: res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('tenantId', res.tenantId.toString());
        this.router.navigate(['/dashboard']);
      },
      error: err => this.loginMessage = err.error?.message || 'Login failed'
    });
  }

  signup() {
    this.signupMessage = '';
    this.http.post<{ message: string }>(this.apiUrl +'Tenant_/signup', {
      email: this.signupEmail,
      companyName: this.signupCompany,
      password: this.signupPassword
    }).subscribe({
      next: res => {
        this.signupMessage = res.message;
        this.mode = 'verifyOtp';
      },
      error: err => this.signupMessage = err.error?.message || 'Signup failed'
    });
  }

  verifyOtp() {
    this.verifyMessage = '';
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
      },
      error: err => this.verifyMessage = err.error?.message || 'OTP verification failed'
    });
  }
}