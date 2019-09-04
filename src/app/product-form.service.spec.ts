import { TestBed } from '@angular/core/testing';

import { ProductFormService } from './product-form.service';

describe('ProductFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductFormService = TestBed.get(ProductFormService);
    expect(service).toBeTruthy();
  });
});
