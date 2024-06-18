import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFacultyDetailsComponent } from './home-faculty-details.component';

describe('HomeFacultyDetailsComponent', () => {
  let component: HomeFacultyDetailsComponent;
  let fixture: ComponentFixture<HomeFacultyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFacultyDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeFacultyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
