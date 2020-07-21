import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentEllipsisComponent } from './comment-ellipsis.component';

describe('CommentEllipsisComponent', () => {
  let component: CommentEllipsisComponent;
  let fixture: ComponentFixture<CommentEllipsisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentEllipsisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentEllipsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
