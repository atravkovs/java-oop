import { Component } from '@angular/core';
import { AuthService } from 'src/app/module/shared/authentication/services/auth.service';
import { ComparisonService } from 'src/app/module/shared/comparison/comparison.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private comparisonService: ComparisonService
  ) {}

  hasComparisons(): boolean {
    return this.comparisonService.hasToCompare();
  }

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
