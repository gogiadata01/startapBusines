import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterWithApiComponent } from './register-with-api.component';

describe('RegisterWithApiComponent', () => {
  let component: RegisterWithApiComponent;
  let fixture: ComponentFixture<RegisterWithApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterWithApiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterWithApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
