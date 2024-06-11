import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniEventsComponent } from './uni-events.component';

describe('UniEventsComponent', () => {
  let component: UniEventsComponent;
  let fixture: ComponentFixture<UniEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
