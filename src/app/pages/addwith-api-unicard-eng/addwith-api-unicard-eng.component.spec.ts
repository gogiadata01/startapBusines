import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwithApiUnicardEngComponent } from './addwith-api-unicard-eng.component';

describe('AddwithApiUnicardEngComponent', () => {
  let component: AddwithApiUnicardEngComponent;
  let fixture: ComponentFixture<AddwithApiUnicardEngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddwithApiUnicardEngComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddwithApiUnicardEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
