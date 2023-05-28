import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySetRowComponent } from './company-set-row.component';

describe('CompanySetRowComponent', () => {
  let component: CompanySetRowComponent;
  let fixture: ComponentFixture<CompanySetRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanySetRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanySetRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
