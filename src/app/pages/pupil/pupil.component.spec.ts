import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilComponent } from './pupil.component';

describe('PupilComponent', () => {
  let component: PupilComponent;
  let fixture: ComponentFixture<PupilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PupilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PupilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
