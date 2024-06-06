import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilUniPageComponent } from './pupil-uni-page.component';

describe('PupilUniPageComponent', () => {
  let component: PupilUniPageComponent;
  let fixture: ComponentFixture<PupilUniPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PupilUniPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PupilUniPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
