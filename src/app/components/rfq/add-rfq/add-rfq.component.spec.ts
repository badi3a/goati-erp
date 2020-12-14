import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRFQComponent } from './add-rfq.component';

describe('AddRFQComponent', () => {
  let component: AddRFQComponent;
  let fixture: ComponentFixture<AddRFQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRFQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRFQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
