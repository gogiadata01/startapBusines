import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUniCardsProgramPageComponent } from './home-uni-cards-program-page.component';

describe('HomeUniCardsProgramPageComponent', () => {
  let component: HomeUniCardsProgramPageComponent;
  let fixture: ComponentFixture<HomeUniCardsProgramPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeUniCardsProgramPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeUniCardsProgramPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
