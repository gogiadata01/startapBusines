import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWithApiEventCardComponent } from './add-with-api-event-card.component';

describe('AddWithApiEventCardComponent', () => {
  let component: AddWithApiEventCardComponent;
  let fixture: ComponentFixture<AddWithApiEventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWithApiEventCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWithApiEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
