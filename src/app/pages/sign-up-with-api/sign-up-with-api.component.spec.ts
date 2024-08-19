import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpWithApiComponent } from './sign-up-with-api.component';

describe('SignUpWithApiComponent', () => {
  let component: SignUpWithApiComponent;
  let fixture: ComponentFixture<SignUpWithApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpWithApiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignUpWithApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
