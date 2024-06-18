import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniProgramComponent } from './uni-program.component';

describe('DrawerComponent', () => {
  let component: UniProgramComponent;
  let fixture: ComponentFixture<UniProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniProgramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
