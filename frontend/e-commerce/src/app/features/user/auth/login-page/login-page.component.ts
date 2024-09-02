import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserLogin } from '../../../../core/models/user-details';
import { UserManagementService } from '../../../../shared/services/userServices/user-management.service';
import { AosService } from '../../../../shared/services/aosService/aos.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private _userManagement: UserManagementService,
    private _router: Router,
    private _aosService: AosService
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnDestroy(): void {
    this.formSubmitted = false;
  }

  ngAfterViewInit(): void {
    this._aosService.refresh();
  }

  onSubmit() {
    this.formSubmitted = true;
    this.error = null;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const userData: UserLogin = { email, password };

      this._userManagement.loginUser(userData).subscribe(
        (res) => {
          console.log(res);
          this._router.navigate(['']);
        },
        (err) => {
          console.log(err);
          this.error = err.message || 'Login failed';
        }
      );

      this.formSubmitted = false;
      this.loginForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
