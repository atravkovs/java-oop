import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListComponent } from './device-list.component';

describe('DeviceListComponent', () => {
  let component: DeviceListComponent;
  let fixture: ComponentFixture<DeviceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeviceListComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DeviceListComponent);
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
