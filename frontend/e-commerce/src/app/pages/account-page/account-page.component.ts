import { Component } from '@angular/core';

import { SignupFormComponent } from '../../components/signup-form/signup-form.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [SignupFormComponent, LoginFormComponent],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css',
})
export class AccountPageComponent {
  isActiveloginForm = true;
  isActiveRegisterForm = false;
  showloginForm = true;

  onRegisterClick() {
    this.showloginForm = false;
    this.isActiveloginForm = false;
    this.isActiveRegisterForm = true;
  }

  onLoginClick() {
    this.showloginForm = true;
    this.isActiveloginForm = true;
    this.isActiveRegisterForm = false;
  }
}
