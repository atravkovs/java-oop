import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySetsComponent } from './company-sets.component';

describe('CompanySetsComponent', () => {
  let component: CompanySetsComponent;
  let fixture: ComponentFixture<CompanySetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanySetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanySetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
