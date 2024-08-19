import { TestBed } from '@angular/core/testing';

import { HomeUniCardService } from './home-uni-card.service';

describe('HomeUniCardService', () => {
  let service: HomeUniCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeUniCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
