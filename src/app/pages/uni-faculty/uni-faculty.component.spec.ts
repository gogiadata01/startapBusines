import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniFacultyComponent } from './uni-faculty.component';

describe('UniFacultyComponent', () => {
  let component: UniFacultyComponent;
  let fixture: ComponentFixture<UniFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniFacultyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UniFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
