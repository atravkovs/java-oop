import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should construct an array of specified length', () => {
    const arr = component.numSequence(5);

    expect(arr.length).toBe(5);
  });

  it('should reset page on search', () => {
    component.query.page = 5;

    component.onSearch();

    expect(component.query.page).toBe(0);
  });

  it('should update page', () => {
    component.updatePage(5);


    expect(component.query.page).toBe(5);
  });
});
