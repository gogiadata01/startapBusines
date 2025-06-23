import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWithApiProgramEnCardComponent } from './add-with-api-program-en-card.component';

describe('AddWithApiProgramEnCardComponent', () => {
  let component: AddWithApiProgramEnCardComponent;
  let fixture: ComponentFixture<AddWithApiProgramEnCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWithApiProgramEnCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWithApiProgramEnCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
