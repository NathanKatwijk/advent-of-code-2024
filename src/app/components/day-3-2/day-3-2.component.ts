import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-day-3-2',
  imports: [CommonModule],
  templateUrl: './day-3-2.component.html',
  styleUrl: './day-3-2.component.scss',
})
export class Day32Component extends DayComponent implements OnInit {
  readonly regex1 = /(do\(\)){1}.*?(don't\(\)){1}/g;
  readonly regex2 = /(mul\(\d+,\d+\)){1}/g;
  readonly regex3 = /\d+,\d+/g;

  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit() {
    this.httpClient
      // .get('assets/day-3/example-input-2.txt', { responseType: 'text' })
      .get('assets/day-3/input.txt', { responseType: 'text' })
      .subscribe((data: any) => {
        this.process(data);
      });
  }

  override process(data: string) {
    // const matches = this.regex.exec(data);
    const updatedData = `do()${data}don't()`.replace(/(\r\n|\n|\r)/gm, '');
    // console.log(updatedData);

    const doMatches = updatedData.match(this.regex1) || [];
    console.log('doMatches', doMatches);

    const matches = doMatches
      .map((doMatch) => doMatch.match(this.regex2))
      .filter((value) => !!value)
      .flat();
    console.log('matches', matches);

    const instructions = matches
      .map((match) => match.match(this.regex3))
      .flat()
      .map((value) => value?.split(','))
      .filter((value) => !!value);
    // console.log('instructions', instructions);

    this.result = this.calculateResult(instructions || []);

    console.log('=====');
    console.log(`Day 3.2 result: ${this.result}`);
  }

  calculateResult(instructions: string[][]) {
    return instructions.reduce(
      (acc, value) => acc + parseInt(value[0], 10) * parseInt(value[1], 10),
      0
    );
  }
}
