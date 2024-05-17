import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterForpupilComponent } from './footer-forpupil.component';

describe('FooterForpupilComponent', () => {
  let component: FooterForpupilComponent;
  let fixture: ComponentFixture<FooterForpupilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterForpupilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterForpupilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
