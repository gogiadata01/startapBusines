import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizWithApiComponent } from './add-quiz-with-api.component';

describe('AddQuizWithApiComponent', () => {
  let component: AddQuizWithApiComponent;
  let fixture: ComponentFixture<AddQuizWithApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddQuizWithApiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddQuizWithApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
