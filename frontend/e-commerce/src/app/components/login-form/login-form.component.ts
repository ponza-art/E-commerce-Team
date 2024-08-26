import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  error = '';

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }

    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;
    console.log(enteredEmail, enteredPassword);

    this.httpClient
      .post('http://localhost:4000/login', {
        email: enteredEmail,
        password: enteredPassword,
      })
      .subscribe({
        next: (resData: any) => {
          console.log(resData);
          // Save the user to local storage
          localStorage.setItem('user', JSON.stringify(resData.token));
        },
        error: (err) => {
          console.log(err);
          this.error = err.error.mssg;
        },
        complete: () => {
          this.error = '';

          // Redirect to HomePage
          this.router.navigate(['/'], {
            replaceUrl: true,
          });
        },
      });
  }
}