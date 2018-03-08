import { TestBed, inject } from '@angular/core/testing';

import { LottolandServiceService } from './lottoland-service.service';

describe('LottolandServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LottolandServiceService]
    });
  });

  it('should be created', inject([LottolandServiceService], (service: LottolandServiceService) => {
    expect(service).toBeTruthy();
  }));
});
