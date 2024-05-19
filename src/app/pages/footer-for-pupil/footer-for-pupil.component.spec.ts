import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterForPupilComponent } from './footer-for-pupil.component';

describe('FooterForPupilComponent', () => {
  let component: FooterForPupilComponent;
  let fixture: ComponentFixture<FooterForPupilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterForPupilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterForPupilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
