import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HardwareRepositoryService } from './hardware.repository.service';

describe('HardwareRepositoryService', () => {
  let service: HardwareRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HardwareRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
