import { TestBed } from '@angular/core/testing';

import { FileUplService } from './file-upl.service';

describe('FileUplService', () => {
  let service: FileUplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileUplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
