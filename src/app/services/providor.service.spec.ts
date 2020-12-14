import { TestBed } from '@angular/core/testing';

import { ProvidorService } from './providor.service';

describe('ProvidorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProvidorService = TestBed.get(ProvidorService);
    expect(service).toBeTruthy();
  });
});
