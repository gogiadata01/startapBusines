import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniDetailsNavbarComponent } from './uni-details-navbar.component';

describe('UniDetailsNavbarComponent', () => {
  let component: UniDetailsNavbarComponent;
  let fixture: ComponentFixture<UniDetailsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniDetailsNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniDetailsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
