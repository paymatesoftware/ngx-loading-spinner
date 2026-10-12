import {TestBed} from '@angular/core/testing';

import {NgxLoadingSpinnerConfigService} from './ngx-loading-spinner-config.service';

describe('NgxLoadingSpinnerService', () => {
  let service: NgxLoadingSpinnerConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [NgxLoadingSpinnerConfigService]});
    service = TestBed.inject(NgxLoadingSpinnerConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
