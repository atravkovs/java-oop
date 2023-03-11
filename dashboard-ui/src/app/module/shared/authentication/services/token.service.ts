import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ActiveUser } from '../models/active-user.model';
import { JwtUser } from '../models/jwt-user.model';
import { UserRole } from '../models/user-role.enum';

@Injectable()
export class TokenService {
  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public logout() {
    return localStorage.removeItem('token');
  }

  public getUser(): ActiveUser | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    const decoded = jwtDecode<JwtUser>(token);

    return {
      email: decoded.sub,
      role: decoded.roles[0],
    };
  }
}
