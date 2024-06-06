import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilEventsPageComponent } from './pupil-events-page.component';

describe('PupilEventsPageComponent', () => {
  let component: PupilEventsPageComponent;
  let fixture: ComponentFixture<PupilEventsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PupilEventsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PupilEventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
