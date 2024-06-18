import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUniProgramComponent } from './home-uni-program.component';

describe('HomeUniProgramComponent', () => {
  let component: HomeUniProgramComponent;
  let fixture: ComponentFixture<HomeUniProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeUniProgramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeUniProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
