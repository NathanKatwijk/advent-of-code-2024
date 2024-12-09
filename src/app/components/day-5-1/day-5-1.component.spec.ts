import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day51Component } from './day-5-1.component';

describe('Day51Component', () => {
  let component: Day51Component;
  let fixture: ComponentFixture<Day51Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day51Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Day51Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
