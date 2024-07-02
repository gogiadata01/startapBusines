import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniFacultyDetailsComponent } from './uni-faculty-details.component';

describe('UniFacultyDetailsComponent', () => {
  let component: UniFacultyDetailsComponent;
  let fixture: ComponentFixture<UniFacultyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniFacultyDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniFacultyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
