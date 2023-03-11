import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceUsersComponent } from './device-users.component';

describe('DeviceUsersComponent', () => {
  let component: DeviceUsersComponent;
  let fixture: ComponentFixture<DeviceUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceUsersComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
