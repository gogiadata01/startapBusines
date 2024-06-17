import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniCardComponent } from './uni-card.component';

describe('HomeCardComponent', () => {
  let component: UniCardComponent;
  let fixture: ComponentFixture<UniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
