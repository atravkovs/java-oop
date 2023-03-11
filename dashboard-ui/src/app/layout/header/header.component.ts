import { Component } from '@angular/core';
import { AuthService } from 'src/app/module/shared/authentication/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }
}
