import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqContentComponent } from './rfq-content.component';

describe('RfqContentComponent', () => {
  let component: RfqContentComponent;
  let fixture: ComponentFixture<RfqContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfqContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
