import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarForStudentComponent } from './navbar-for-student.component';

describe('NavbarForStudentComponent', () => {
  let component: NavbarForStudentComponent;
  let fixture: ComponentFixture<NavbarForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarForStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
