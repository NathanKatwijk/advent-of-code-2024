import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-day-3-1',
  imports: [CommonModule],
  templateUrl: './day-3-1.component.html',
  styleUrl: './day-3-1.component.scss',
})
export class Day31Component extends DayComponent implements OnInit {
  readonly regex1 = /(mul\(\d+,\d+\)){1}/g;
  readonly regex2 = /\d+,\d+/g;

  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit() {
    this.httpClient
      // .get('assets/day-3/example-input-1.txt', { responseType: 'text' })
      .get('assets/day-3/input.txt', { responseType: 'text' })
      .subscribe((data: any) => {
        this.process(data);
      });
  }

  override process(data: string) {
    // const matches = this.regex.exec(data);
    const matches = data.match(this.regex1) || [];

    const instructions = matches
      .map((match) => match.match(this.regex2))
      .flat()
      .map((value) => value?.split(','))
      .filter((value) => value !== undefined);
    // console.log(instructions);

    this.result = this.calculateResult(instructions || []);

    console.log('=====');
    console.log(`Day 3.1 result: ${this.result}`);
  }

  calculateResult(instructions: string[][]) {
    return instructions.reduce(
      (acc, value) => acc + parseInt(value[0], 10) * parseInt(value[1], 10),
      0
    );
  }
}
