import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day11Component } from './day-1-1.component';

describe('Day11Component', () => {
  let component: Day11Component;
  let fixture: ComponentFixture<Day11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day11Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Day11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
