import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthenticationModule } from 'src/app/module/shared/authentication/authentication.module';
import { AuthService } from 'src/app/module/shared/authentication/services/auth.service';
import { UserRole } from 'src/app/module/shared/user/models/user-role.enum';
import { UserRepositoryService } from 'src/app/module/shared/user/services/user.repository.service';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let userRepository: UserRepositoryService;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule, AuthenticationModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    userRepository = TestBed.inject(UserRepositoryService);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete user', () => {
    spyOn(userRepository, 'deleteUser').and.returnValue(of({}));
    spyOn(authService, 'logout').and.stub();

    component.storedUser = {
      email: 'test@test.com',
      name: 'test',
      surname: 'test',
      role: UserRole.User,
    };

    component.deleteUser();

    expect(userRepository.deleteUser).toHaveBeenCalledWith('test@test.com');
    expect(authService.logout).toHaveBeenCalled();
  });

  it('should not delete user if user is missing', () => {
    spyOn(userRepository, 'deleteUser').and.returnValue(of());
    spyOn(authService, 'logout').and.stub();

    component.storedUser = null;

    component.deleteUser();

    expect(userRepository.deleteUser).not.toHaveBeenCalledWith('test@test.com');
    expect(authService.logout).not.toHaveBeenCalled();
  });

  it('should update user', () => {
    spyOn(userRepository, 'updateUser').and.returnValue(
      of({
        name: 'test@test.com',
        email: 'test1',
        surname: 'test1',
        role: UserRole.User,
      })
    );

    component.storedUser = {
      email: 'test@test.com',
      name: 'test',
      surname: 'test',
      role: UserRole.User,
    };

    component.name?.setValue('test1');
    component.surname?.setValue('test1');

    component.updateUser();

    expect(userRepository.updateUser).toHaveBeenCalledWith('test@test.com', {
      name: 'test1',
      surname: 'test1'
    });
  });
});
