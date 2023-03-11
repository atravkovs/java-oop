import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationModule } from 'src/app/module/shared/authentication/authentication.module';
import { AuthService } from 'src/app/module/shared/authentication/services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [AuthenticationModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login with valid form', () => {
    component.email?.setValue('test@test.com');
    component.password?.setValue('abcABC123');

    spyOn(authService, 'login').and.callThrough();

    component.login();

    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'abcABC123',
    });
  });

  it('should not login with invalid form', () => {
    component.email?.setValue('');
    component.password?.setValue('');

    spyOn(authService, 'login').and.callThrough();

    component.login();

    expect(authService.login).not.toHaveBeenCalled();
  });
});
