import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DayComponent } from '../day/day.component';

@Component({
  selector: 'app-day-2-1',
  imports: [CommonModule],
  templateUrl: './day-2-1.component.html',
  styleUrl: './day-2-1.component.scss',
})
export class Day21Component extends DayComponent implements OnInit {
  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit() {
    this.httpClient
      // .get('assets/day-2/example-input.txt', { responseType: 'text' })
      .get('assets/day-2/input.txt', { responseType: 'text' })
      .subscribe((data: any) => {
        this.process(data);
      });
  }

  override process(data: string) {
    const sanitizedInput = data
      .split('\n')
      .slice(0, -1)
      .map((row) => row.split(' ').map((value) => parseInt(value, 10)));
    // console.log('sanitizedInput', sanitizedInput);

    this.result = this.calculateResult(sanitizedInput);

    console.log('=====');
    console.log(`Day 2.1 result: ${this.result}`);
  }

  calculateResult(reports: number[][]) {
    return reports.filter((report) => {
      const allIncreasing = report.reduce((acc, currentValue, index) => {
        if (report.length === index + 1) {
          return acc;
        }
        if (currentValue > report[index + 1]) {
          return false;
        }

        return acc;
      }, true);

      const allDecreasing = report.reduce((acc, currentValue, index) => {
        if (report.length === index + 1) {
          return acc;
        }
        if (currentValue < report[index + 1]) {
          return false;
        }

        return acc;
      }, true);

      const allCorrectDifference = report.reduce((acc, currentValue, index) => {
        if (report.length === index + 1) {
          return acc;
        }
        const difference = Math.abs(currentValue - report[index + 1]);
        if (difference < 1 || difference > 3) {
          return false;
        }

        return acc;
      }, true);

      // console.log({ allIncreasing, allDecreasing, allCorrectDifference });
      return (allIncreasing || allDecreasing) && allCorrectDifference;
    }).length;
  }
}
