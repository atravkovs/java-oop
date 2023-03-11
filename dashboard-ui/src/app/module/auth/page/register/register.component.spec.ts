import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationModule } from 'src/app/module/shared/authentication/authentication.module';
import { AuthService } from 'src/app/module/shared/authentication/services/auth.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [AuthenticationModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register with valid form', () => {
    component.name?.setValue('Name');
    component.surname?.setValue('Surname');
    component.password?.setValue('abcABC123');
    component.email?.setValue('test@test.com');

    spyOn(authService, 'register').and.callThrough();

    component.register();

    expect(authService.register).toHaveBeenCalledWith({
      name: 'Name',
      surname: 'Surname',
      password: 'abcABC123',
      email: 'test@test.com',
    });
  });

  it('should not register with invalid form', () => {
    component.email?.setValue('');
    component.password?.setValue('');
    component.name?.setValue('Name');
    component.surname?.setValue('Surname');

    spyOn(authService, 'register').and.callThrough();

    component.register();

    expect(authService.register).not.toHaveBeenCalled();
  });
});
