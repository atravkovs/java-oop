import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationModule } from 'src/app/module/shared/authentication/authentication.module';

import { DeviceDetailsComponent } from './device-details.component';

describe('DeviceDetailsComponent', () => {
  let component: DeviceDetailsComponent;
  let fixture: ComponentFixture<DeviceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceDetailsComponent],
      imports: [HttpClientTestingModule, AuthenticationModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ deviceId: '123' }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
