import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilEventsAddPageComponent } from './pupil-events-add-page.component';

describe('PupilEventsAddPageComponent', () => {
  let component: PupilEventsAddPageComponent;
  let fixture: ComponentFixture<PupilEventsAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PupilEventsAddPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PupilEventsAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
