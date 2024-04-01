import { TestBed } from '@angular/core/testing';

import { RecruithomeService } from './recruithome.service';

describe('RecruithomeService', () => {
  let service: RecruithomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruithomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
