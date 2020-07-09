import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedBreweriesComponent } from './saved-breweries.component';

describe('SavedBreweriesComponent', () => {
  let component: SavedBreweriesComponent;
  let fixture: ComponentFixture<SavedBreweriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedBreweriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedBreweriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
