import { Component, OnInit } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day-1-2',
  imports: [CommonModule],
  templateUrl: './day-1-2.component.html',
  styleUrl: './day-1-2.component.scss'
})
export class Day12Component extends DayComponent implements OnInit {
  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit() {
    this.httpClient
      // .get('assets/day-1/example-input.txt', { responseType: 'text' })
      .get('assets/day-1/input.txt', { responseType: 'text' })
      .subscribe((data: any) => {
        this.process(data);
      });
  }

  override process(data: string) {
    const sanitizedInput = data.replace(/\s{3}/g, '-').split('\n').slice(0, -1);
    // console.log('sanitizedInput', sanitizedInput);

    const leftList = sanitizedInput
      .map((value) => parseInt(value.substring(0, value.indexOf('-')), 10))
      .sort();

    const rightList = sanitizedInput
      .map((value) => parseInt(value.substring(value.indexOf('-') + 1), 10))
      .sort();

    // console.log({ leftList, rightList });

    this.result = this.calculateResult(leftList, rightList);

    console.log('=====');
    console.log(`Day 1.2 result: ${this.result}`);
  }

  calculateResult(leftList: number[], rightList: number[]) {
    let result = 0;

    leftList.forEach((leftListItem) => {
      result += leftListItem * rightList.filter((value) => value === leftListItem).length;
    });

    return result;
  }
}
