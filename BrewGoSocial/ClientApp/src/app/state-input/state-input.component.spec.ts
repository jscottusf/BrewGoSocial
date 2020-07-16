import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateInputComponent } from './state-input.component';

describe('StateInputComponent', () => {
  let component: StateInputComponent;
  let fixture: ComponentFixture<StateInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
