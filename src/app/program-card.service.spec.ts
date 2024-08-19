import { TestBed } from '@angular/core/testing';

import { ProgramCardService } from './program-card.service';

describe('ProgramCardService', () => {
  let service: ProgramCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
