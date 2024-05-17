import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterForStudentComponent } from './footer-for-student.component';

describe('FooterForStudentComponent', () => {
  let component: FooterForStudentComponent;
  let fixture: ComponentFixture<FooterForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterForStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
