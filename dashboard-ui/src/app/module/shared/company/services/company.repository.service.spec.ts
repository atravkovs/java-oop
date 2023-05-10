import { TestBed } from '@angular/core/testing';

import { CompanyRepositoryService } from './company.repository.service';

describe('CompanyRepositoryService', () => {
  let service: CompanyRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
