import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniDetailsComponent } from './uni-details.component';

describe('UniDetailsComponent', () => {
  let component: UniDetailsComponent;
  let fixture: ComponentFixture<UniDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
