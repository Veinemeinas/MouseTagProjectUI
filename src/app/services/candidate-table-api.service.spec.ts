import { TestBed } from '@angular/core/testing';

import { CandidateTableApiService } from './candidate-table-api.service';

describe('CandidateTableApiService', () => {
  let service: CandidateTableApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateTableApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
