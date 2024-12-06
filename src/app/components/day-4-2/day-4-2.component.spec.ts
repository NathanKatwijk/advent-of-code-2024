import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Day42Component } from './day-4-2.component';

describe('Day42Component', () => {
  let component: Day42Component;
  let fixture: ComponentFixture<Day42Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Day42Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Day42Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
