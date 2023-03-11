import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListByEmailsComponent } from './user-list-by-emails.component';

describe('UserListByEmailsComponent', () => {
  let component: UserListByEmailsComponent;
  let fixture: ComponentFixture<UserListByEmailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListByEmailsComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListByEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
