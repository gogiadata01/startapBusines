import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarWithoutLanguageComponent } from './navbar-without-language.component';

describe('NavbarWithoutLanguageComponent', () => {
  let component: NavbarWithoutLanguageComponent;
  let fixture: ComponentFixture<NavbarWithoutLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarWithoutLanguageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarWithoutLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
