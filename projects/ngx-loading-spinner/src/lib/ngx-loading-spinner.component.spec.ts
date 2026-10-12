import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxLoadingSpinnerComponent} from './ngx-loading-spinner.component';

describe('NgxLoadingSpinnerComponent', () => {
  let component: NgxLoadingSpinnerComponent;
  let fixture: ComponentFixture<NgxLoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxLoadingSpinnerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NgxLoadingSpinnerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
