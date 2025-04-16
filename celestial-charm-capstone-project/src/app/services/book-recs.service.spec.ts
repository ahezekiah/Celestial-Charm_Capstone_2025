import { TestBed } from '@angular/core/testing';

import { BookRecsService } from './book-recs.service';

describe('BookRecsService', () => {
  let service: BookRecsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookRecsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
