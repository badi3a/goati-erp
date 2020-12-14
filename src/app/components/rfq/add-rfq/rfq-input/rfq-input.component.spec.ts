import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqInputComponent } from './rfq-input.component';

describe('RfqInputComponent', () => {
  let component: RfqInputComponent;
  let fixture: ComponentFixture<RfqInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
