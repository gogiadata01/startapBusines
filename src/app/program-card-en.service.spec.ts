import { TestBed } from '@angular/core/testing';

import { ProgramCardEnService } from './program-card-en.service';

describe('ProgramCardEnService', () => {
  let service: ProgramCardEnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramCardEnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
