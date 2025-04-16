import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookrecsComponent } from './bookrecs.component';

describe('BookrecsComponent', () => {
  let component: BookrecsComponent;
  let fixture: ComponentFixture<BookrecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookrecsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookrecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
