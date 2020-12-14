import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidorComponent } from './providor.component';

describe('ProvidorComponent', () => {
  let component: ProvidorComponent;
  let fixture: ComponentFixture<ProvidorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
