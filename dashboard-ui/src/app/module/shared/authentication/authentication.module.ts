import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AuthenticationRepository } from './services/authentication.repository';
import { TokenService } from './services/token.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [AuthService, AuthenticationRepository, TokenService],
})
export class AuthenticationModule {}
