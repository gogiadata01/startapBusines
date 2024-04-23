import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcComponent } from './formc.component';

describe('FormcComponent', () => {
  let component: FormcComponent;
  let fixture: ComponentFixture<FormcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
