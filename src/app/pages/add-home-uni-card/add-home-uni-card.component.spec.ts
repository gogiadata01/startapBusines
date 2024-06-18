import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeUniCardComponent } from './add-home-uni-card.component';

describe('AddHomeUniCardComponent', () => {
  let component: AddHomeUniCardComponent;
  let fixture: ComponentFixture<AddHomeUniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHomeUniCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddHomeUniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
