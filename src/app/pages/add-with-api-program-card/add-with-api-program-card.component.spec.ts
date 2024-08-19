import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWithApiProgramCardComponent } from './add-with-api-program-card.component';

describe('AddWithApiProgramCardComponent', () => {
  let component: AddWithApiProgramCardComponent;
  let fixture: ComponentFixture<AddWithApiProgramCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWithApiProgramCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWithApiProgramCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
