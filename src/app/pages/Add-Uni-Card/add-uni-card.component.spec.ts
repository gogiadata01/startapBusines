import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUniCardComponent } from './add-uni-card.component';

describe('FormcComponent', () => {
  let component: AddUniCardComponent;
  let fixture: ComponentFixture<AddUniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUniCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
