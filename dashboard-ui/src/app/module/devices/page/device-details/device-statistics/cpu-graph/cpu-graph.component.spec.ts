import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuGraphComponent } from './cpu-graph.component';

describe('CpuGraphComponent', () => {
  let component: CpuGraphComponent;
  let fixture: ComponentFixture<CpuGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CpuGraphComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CpuGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
