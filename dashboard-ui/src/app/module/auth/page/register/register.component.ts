import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/authentication/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registrationForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(120),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/),
    ]),
  });

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get surname() {
    return this.registrationForm.get('surname');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  register() {
    if (this.registrationForm.valid) {
      const registrationDTO = {
        name: this.name?.value,
        email: this.email?.value,
        surname: this.surname?.value,
        password: this.password?.value,
      };

      this.authService.register(registrationDTO).subscribe({
        error: ({ error }: HttpErrorResponse) => {
          this.errorMessage = error.message;
        },
      });
    }
  }
}
