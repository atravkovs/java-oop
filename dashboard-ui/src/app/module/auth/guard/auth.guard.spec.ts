import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationModule } from '../../shared/authentication/authentication.module';
import { UserRole } from '../../shared/authentication/models/user-role.enum';
import { TokenService } from '../../shared/authentication/services/token.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let tokenService: TokenService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AuthenticationModule],
    });
    guard = TestBed.inject(AuthGuard);
    tokenService = TestBed.inject(TokenService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should activate for admin', () => {
    spyOn(tokenService, 'isLoggedIn').and.returnValue(true);
    spyOn(tokenService, 'getUser').and.returnValue({
      role: UserRole.Admin,
      email: 'test@test.com',
    });

    expect(
      guard.canActivate(
        {
          data: {
            roles: [UserRole.Admin],
          },
        } as any,
        {
          root: null as any,
          url: '/',
        }
      )
    ).toBeTrue();
  });

  it('should not activate admin route for user', () => {
    spyOn(tokenService, 'isLoggedIn').and.returnValue(true);
    spyOn(tokenService, 'getUser').and.returnValue({
      role: UserRole.User,
      email: 'test@test.com',
    });
    spyOn(router, 'navigate').and.callThrough();

    expect(
      guard.canActivate(
        {
          data: {
            roles: [UserRole.Admin],
          },
        } as any,
        {
          root: null as any,
          url: '/',
        }
      )
    ).toBeFalse();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should redirect unauthorized user', () => {
    spyOn(tokenService, 'isLoggedIn').and.returnValue(false);
    spyOn(tokenService, 'getUser').and.returnValue({
      role: UserRole.User,
      email: 'test@test.com',
    });
    spyOn(router, 'navigate').and.resolveTo(true);

    expect(
      guard.canActivate(
        {
          data: {
            roles: [UserRole.Admin],
          },
        } as any,
        {
          root: null as any,
          url: '/',
        }
      )
    ).toBeFalse();
  });
});
