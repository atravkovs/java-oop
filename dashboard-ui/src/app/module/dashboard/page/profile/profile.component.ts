import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/module/shared/authentication/services/auth.service';
import { User } from 'src/app/module/shared/user/models/user.model';
import { UserRepositoryService } from 'src/app/module/shared/user/services/user.repository.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
    ]),
    surname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
    ]),
  });

  storedUser: User | null = null;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  get name() {
    return this.profileForm.get('name');
  }

  get surname() {
    return this.profileForm.get('surname');
  }

  constructor(
    private userRepository: UserRepositoryService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userRepository.getCurrentUser().subscribe((user) => {
      this.storedUser = user;
      this.name?.setValue(user.name);
      this.surname?.setValue(user.surname);
    });
  }

  /**
   * Displays message and auto-hides it after 2.5 seconds
   */
  displaySuccessMessage(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 2500);
  }

  updateUser(): void {
    if (!this.profileForm.valid || !this.storedUser?.email) {
      return;
    }

    const updateDTO = {
      name: this.name?.value,
      surname: this.surname?.value,
    };

    this.userRepository
      .updateUser(this.storedUser?.email, updateDTO)
      .subscribe({
        next: () => {
          this.displaySuccessMessage('User Successfully updated');
        },
        error: ({ error }: HttpErrorResponse) => {
          this.errorMessage = error.message;
        },
      });
  }

  deleteUser(): void {
    if (!this.storedUser?.email) {
      return;
    }

    this.userRepository.deleteUser(this.storedUser?.email).subscribe({
      next: () => this.authService.logout(),
      error: ({ error }: HttpErrorResponse) => {
        this.errorMessage = error.message;
      },
    });
  }
}
