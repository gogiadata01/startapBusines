import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFacultyUniDetailsComponent } from './home-faculty-uni-details.component';

describe('HomeFacultyUniDetailsComponent', () => {
  let component: HomeFacultyUniDetailsComponent;
  let fixture: ComponentFixture<HomeFacultyUniDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFacultyUniDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeFacultyUniDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
