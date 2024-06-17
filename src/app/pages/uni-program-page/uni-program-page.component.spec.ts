import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniProgramPageComponent } from './uni-program-page.component';

describe('UniFacultyComponent', () => {
  let component: UniProgramPageComponent;
  let fixture: ComponentFixture<UniProgramPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniProgramPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniProgramPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
