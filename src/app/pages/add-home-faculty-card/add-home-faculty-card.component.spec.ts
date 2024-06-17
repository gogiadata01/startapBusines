import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeFacultyCardComponent } from './add-home-faculty-card.component';

describe('AddHomeFacultyCardComponent', () => {
  let component: AddHomeFacultyCardComponent;
  let fixture: ComponentFixture<AddHomeFacultyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHomeFacultyCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddHomeFacultyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
