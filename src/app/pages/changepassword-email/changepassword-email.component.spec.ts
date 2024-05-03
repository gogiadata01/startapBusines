import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepasswordEmailComponent } from './changepassword-email.component';

describe('ChangepasswordEmailComponent', () => {
  let component: ChangepasswordEmailComponent;
  let fixture: ComponentFixture<ChangepasswordEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangepasswordEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangepasswordEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
