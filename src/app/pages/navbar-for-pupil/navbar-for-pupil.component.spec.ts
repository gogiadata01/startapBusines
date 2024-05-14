import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarForPupilComponent } from './navbar-for-pupil.component';

describe('NavbarForPupilComponent', () => {
  let component: NavbarForPupilComponent;
  let fixture: ComponentFixture<NavbarForPupilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarForPupilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarForPupilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
