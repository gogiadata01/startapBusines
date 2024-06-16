import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniProgramsComponent } from './uni-programs.component';

describe('UniProgramsComponent', () => {
  let component: UniProgramsComponent;
  let fixture: ComponentFixture<UniProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniProgramsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
