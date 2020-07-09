import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweryRatingComponent } from './brewery-rating.component';

describe('BreweryRatingComponent', () => {
  let component: BreweryRatingComponent;
  let fixture: ComponentFixture<BreweryRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweryRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweryRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
