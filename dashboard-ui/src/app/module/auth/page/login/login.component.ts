import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/authentication/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(120),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/),
    ]),
  });

  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      this.authService
        .login({
          email: this.email?.value,
          password: this.password?.value,
        })
        .subscribe({
          error: () => {
            this.errorMessage =
              'Provided data are not valid, please try again';
          },
        });
    }
  }
}
