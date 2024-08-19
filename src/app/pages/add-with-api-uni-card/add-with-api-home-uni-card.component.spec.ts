import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWithApiHomeUniCardComponent } from './add-with-api-home-uni-card.component';

describe('AddWithApiHomeUniCardComponent', () => {
  let component: AddWithApiHomeUniCardComponent;
  let fixture: ComponentFixture<AddWithApiHomeUniCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWithApiHomeUniCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWithApiHomeUniCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
