import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyUniDetailsComponent } from './faculty-uni-details.component';

describe('FacultyUniDetailsComponent', () => {
  let component: FacultyUniDetailsComponent;
  let fixture: ComponentFixture<FacultyUniDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyUniDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultyUniDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
