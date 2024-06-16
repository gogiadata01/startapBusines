import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultiDetailsComponent } from './faculti-details.component';

describe('FacultiDetailsComponent', () => {
  let component: FacultiDetailsComponent;
  let fixture: ComponentFixture<FacultiDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultiDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultiDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
