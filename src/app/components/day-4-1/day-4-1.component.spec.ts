import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day41Component } from './day-4-1.component';

describe('Day41Component', () => {
  let component: Day41Component;
  let fixture: ComponentFixture<Day41Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day41Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Day41Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
