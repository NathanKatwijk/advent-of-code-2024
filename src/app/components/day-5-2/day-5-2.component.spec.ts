import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day52Component } from './day-5-2.component';

describe('Day52Component', () => {
  let component: Day52Component;
  let fixture: ComponentFixture<Day52Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day52Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Day52Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
