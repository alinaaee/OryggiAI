// src/app/auth/auth.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavigationStateService } from '../navigation-state.service';
import { OryggiAiService } from '../oryggi-ai.service';
import { UtilityService } from '../utility.service';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ CommonModule, FormsModule, HttpClientModule, RouterModule, MatFormFieldModule, MatIconModule, MatInputModule, MatLabel, MatButtonModule, MatProgressSpinnerModule, ReactiveFormsModule ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  //#region [variables]
  logo = 'assets/Logo/logo-Oryggi.png';
  mode: 'login' | 'signup' | 'verifyOtp' = 'login';

  readonly emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  readonly otpPattern = /^[0-9]{6}$/;

  loginForm!: FormGroup;
  signupForm!: FormGroup;
  otpForm!: FormGroup;

  loginMessage = '';
  signupMessage = '';
  verifyMessage = '';

  loading = false;
  signupLoading = false;
  otpLoading = false;

  //#endregion [variables]

  constructor( private fb: FormBuilder, private aiService: OryggiAiService, private router: Router, private navStateService: NavigationStateService, public utilService: UtilityService ) {
    this.initializeForms();
  }

  initializeForms(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required],
    });
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      companyName: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(this.otpPattern)]],
    });
  }

  login(): void {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.loginMessage = '';
    this.aiService.login(this.loginForm.value).subscribe({
      next: ({ token, tenantId }) => {
        this.storeSession(token, tenantId);
        this.navStateService.setAllowed(true);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loginMessage = err.error?.message || 'Login failed';
      },
      complete: () => (this.loading = false),
    });
  }

  signup(): void {
    if (this.signupForm.invalid) return;
    this.signupLoading = true;
    this.signupMessage = '';
    this.aiService.signup(this.signupForm.value).subscribe({
      next: ({ message }) => {
        this.signupMessage = message;
        this.mode = 'verifyOtp';
      },
      error: (err) => {
        this.signupMessage = err.error?.message || 'Signup failed';
      },
      complete: () => (this.signupLoading = false),
    });
  }

  verifyOtp(): void {
    if (this.otpForm.invalid) return;
    this.otpLoading = true;
    this.verifyMessage = '';
    const requestData = { ...this.signupForm.value, otp: this.otpForm.value.otp };

    this.aiService.verifyOtp(requestData).subscribe({
      next: ({ token, tenantId }) => {
        this.storeSession(token, tenantId);
        this.navStateService.setAllowed(true);
        this.router.navigate(['/questions']);
      },
      error: (err) => {
        this.verifyMessage = err.error?.message || 'OTP verification failed';
      },
      complete: () => (this.otpLoading = false),
    });
  }

  private storeSession(token: string, tenantId: number): void {
    localStorage.setItem('token', token);
    localStorage.setItem('tenantId', tenantId.toString());
  }
}