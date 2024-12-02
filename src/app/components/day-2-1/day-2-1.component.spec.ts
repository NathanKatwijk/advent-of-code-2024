import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day21Component } from './day-2-1.component';

describe('Day21Component', () => {
  let component: Day21Component;
  let fixture: ComponentFixture<Day21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day21Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Day21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
