import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day22Component } from './day-2-2.component';

describe('Day22Component', () => {
  let component: Day22Component;
  let fixture: ComponentFixture<Day22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day22Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Day22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
