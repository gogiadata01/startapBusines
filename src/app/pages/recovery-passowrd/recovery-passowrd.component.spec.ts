import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryPassowrdComponent } from './recovery-passowrd.component';

describe('RecoveryPassowrdComponent', () => {
  let component: RecoveryPassowrdComponent;
  let fixture: ComponentFixture<RecoveryPassowrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoveryPassowrdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecoveryPassowrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
