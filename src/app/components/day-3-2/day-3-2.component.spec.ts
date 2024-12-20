import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day32Component } from './day-3-2.component';

describe('Day32Component', () => {
  let component: Day32Component;
  let fixture: ComponentFixture<Day32Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day32Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Day32Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
