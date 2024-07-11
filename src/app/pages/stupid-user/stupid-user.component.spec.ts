import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StupidUserComponent } from './stupid-user.component';

describe('StupidUserComponent', () => {
  let component: StupidUserComponent;
  let fixture: ComponentFixture<StupidUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StupidUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StupidUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
