import { Component, OnInit } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day-4-2',
  imports: [CommonModule],
  templateUrl: './day-4-2.component.html',
  styleUrl: './day-4-2.component.scss',
})
export class Day42Component extends DayComponent implements OnInit {
  readonly regex = /(XMAS){1}/gm;

  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit() {
    this.httpClient
      // .get('assets/day-4/example-input.txt', { responseType: 'text' })
      .get('assets/day-4/input.txt', { responseType: 'text' })
      .subscribe((data: any) => {
        this.process(data);
      });
  }

  override process(data: string) {
    const sanitizedInput = data.split('\n').slice(0, -1);
    // console.log('sanitizedInput', sanitizedInput);

    const horizontalLeftToRight = sanitizedInput.slice();
    const horizontalRightToLeft = this.reverseInput(horizontalLeftToRight);

    const verticalTopToBottom = this.changeInputToVertical(
      sanitizedInput.slice()
    );
    const verticalBottomToTop = this.reverseInput(verticalTopToBottom.slice());

    const matches = [
      this.findMatches(horizontalLeftToRight, 'horizontalLeftToRight'),
      this.findMatches(horizontalRightToLeft, 'horizontalRightToLeft'),
      this.findMatches(verticalTopToBottom, 'verticalTopToBottom'),
      this.findMatches(verticalBottomToTop, 'verticalBottomToTop'),
    ];
    // console.log(matches);

    this.result = matches.reduce((acc, value) => acc + value, 0);

    console.log('=====');
    console.log(`Day 4.2 result: ${this.result}`);
  }

  reverseInput(list: string[]) {
    return list.map((value) => value.split('').toReversed().join('')).flat();
  }

  changeInputToVertical(list: string[]) {
    const verticalInput = Array.from(Array(list[0].length));

    for (let yIndex = 0; yIndex < list.length; yIndex++) {
      for (let xIndex = 0; xIndex < list[0].length; xIndex++) {
        if (verticalInput[xIndex]) {
          verticalInput[xIndex] += list[yIndex][xIndex];
        } else {
          verticalInput[xIndex] = list[yIndex][xIndex];
        }
      }
    }
    return verticalInput;
  }

  findMatches(list: string[], label: string) {
    let matches = 0;

    list.forEach((row: string, yIndex: number) => {
      row.split('').forEach((character: string, xIndex: number) => {
        if (character === 'M') {
          if (
            list[yIndex + 2] !== undefined &&
            list[yIndex + 2][xIndex] === 'M'
          ) {
            if (row[xIndex + 2] !== undefined && row[xIndex + 2] === 'S') {
              if (list[yIndex + 2][xIndex + 2] === 'S') {
                if (list[yIndex + 1][xIndex + 1] === 'A') {
                  matches++;
                  // console.log(`MATCH ${label}: `, {
                  //   xStart: xIndex,
                  //   yStart: yIndex,
                  //   xEnd: xIndex + 2,
                  //   yEnd: yIndex + 2,
                  // });
                }
              }
            }
          }
        }
      });
    });

    return matches;
  }
}
