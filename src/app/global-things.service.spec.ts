import { TestBed } from '@angular/core/testing';

import { GlobalThingsService } from './global-things.service';

describe('GlobalThingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalThingsService = TestBed.get(GlobalThingsService);
    expect(service).toBeTruthy();
  });
});
