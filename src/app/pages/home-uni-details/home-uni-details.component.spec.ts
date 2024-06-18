import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUniDetailsComponent } from './home-uni-details.component';

describe('HomeUniDetailsComponent', () => {
  let component: HomeUniDetailsComponent;
  let fixture: ComponentFixture<HomeUniDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeUniDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeUniDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
