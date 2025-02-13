import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniEventPageComponent } from './uni-event-page.component';

describe('UniEventPageComponent', () => {
  let component: UniEventPageComponent;
  let fixture: ComponentFixture<UniEventPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniEventPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniEventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
