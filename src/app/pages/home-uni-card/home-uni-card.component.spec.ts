import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUniCardComponent } from './home-uni-card.component';

describe('HomeUniCardComponent', () => {
  let component: HomeUniCardComponent;
  let fixture: ComponentFixture<HomeUniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeUniCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeUniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
