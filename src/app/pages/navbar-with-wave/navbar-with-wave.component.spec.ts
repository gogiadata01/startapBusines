import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarWithWaveComponent } from './navbar-with-wave.component';

describe('NavbarWithWaveComponent', () => {
  let component: NavbarWithWaveComponent;
  let fixture: ComponentFixture<NavbarWithWaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarWithWaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarWithWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
