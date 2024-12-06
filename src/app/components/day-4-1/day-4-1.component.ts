import { Component, OnInit } from '@angular/core';
import { DayComponent } from '../day/day.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day-4-1',
  imports: [CommonModule],
  templateUrl: './day-4-1.component.html',
  styleUrl: './day-4-1.component.scss',
})
export class Day41Component extends DayComponent implements OnInit {
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

    // console.log('> diagonalLeftUpToRightDown');
    const diagonalLeftUpToRightDown = this.changeInputToDiagonal(
      horizontalLeftToRight.slice()
      // 0,
      // 0,
      // 1,
      // 1
    );

    // console.log('diagonalRightUpToLeftDown');
    const diagonalRightUpToLeftDown = this.changeInputToDiagonal(
      horizontalRightToLeft.slice()
      // 0,
      // sanitizedInput[0].length - 1,
      // 1,
      // -1
    );

    // console.log('diagonalLeftDownToRightUp');
    const diagonalLeftDownToRightUp = this.changeInputToDiagonal(
      this.changeInputHorizontally(horizontalLeftToRight.slice())
      // this.reverseInput(diagonalRightUpToLeftDown.slice())
      // sanitizedInput.length - 1,
      // 0,
      // -1,
      // 1
    );

    // console.log('diagonalRightDownToLeftUp');
    const diagonalRightDownToLeftUp = this.changeInputToDiagonal(
      this.changeInputHorizontally(horizontalRightToLeft.slice())
      // this.reverseInput(diagonalLeftUpToRightDown.slice())
      // sanitizedInput.length - 1,
      // sanitizedInput[0].length - 1,
      // -1,
      // -1
    );

    // console.log({
    //   horizontalLeftToRight,
    //   horizontalRightToLeft,
    //   verticalTopToBottom,
    //   verticalBottomToTop,
    //   diagonalLeftUpToRightDown,
    //   diagonalRightUpToLeftDown,
    //   diagonalLeftDownToRightUp,
    //   diagonalRightDownToLeftUp,
    // });

    const matches = [
      this.findMatches(horizontalLeftToRight, 'horizontalLeftToRight'),
      this.findMatches(horizontalRightToLeft, 'horizontalRightToLeft'),
      this.findMatches(verticalTopToBottom, 'verticalTopToBottom'),
      this.findMatches(verticalBottomToTop, 'verticalBottomToTop'),
      this.findMatches(diagonalLeftUpToRightDown, 'diagonalLeftUpToRightDown'),
      this.findMatches(diagonalRightUpToLeftDown, 'diagonalRightUpToLeftDown'),
      this.findMatches(diagonalLeftDownToRightUp, 'diagonalLeftDownToRightUp'),
      this.findMatches(diagonalRightDownToLeftUp, 'diagonalRightDownToLeftUp'),
    ];
    // console.log(matches);

    this.result = matches.reduce((acc, value) => acc + value, 0);

    console.log('=====');
    console.log(`Day 4.1 result: ${this.result}`);
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

  changeInputHorizontally(list: string[]) {
    return list.toReversed();
  }

  changeInputToDiagonal(list: string[]) {
    const diagonalInput = [];

    for (let yIndex = 0; yIndex < list.length; yIndex) {
      let diagonalYIndex = yIndex;
      let diagonalXIndex = 0;
      yIndex++;

      const generatedValue = this.generateValue(
        list,
        diagonalYIndex,
        diagonalXIndex
      );
      diagonalInput.push(generatedValue);
      // console.log(generatedValue);
      // console.log('-');
    }

    for (let xIndex = 1; xIndex < list[0].length; xIndex) {
      let diagonalYIndex = 0;
      let diagonalXIndex = xIndex;
      xIndex++;

      const generatedValue = this.generateValue(
        list,
        diagonalYIndex,
        diagonalXIndex
      );
      diagonalInput.push(generatedValue);
      // console.log(generatedValue);
      // console.log('-');
    }
    // console.log('===');
    return diagonalInput;
  }

  generateValue(
    list: string[],
    startDiagonalYIndex: number,
    startDiagonalXIndex: number
  ) {
    let value = '';
    let diagonalYIndex = startDiagonalYIndex;
    let diagonalXIndex = startDiagonalXIndex;

    while (true) {
      if (
        list[diagonalYIndex] === undefined ||
        list[diagonalYIndex][diagonalXIndex] === undefined
      ) {
        break;
      }
      // console.log(diagonalYIndex, diagonalXIndex);
      // console.log(list[diagonalYIndex][diagonalXIndex]);

      value += list[diagonalYIndex][diagonalXIndex];
      diagonalYIndex++;
      diagonalXIndex++;
    }

    return value;
  }

  findMatches(list: string[], label: string) {
    return list.reduce((acc, value) => {
      const match = value.match(this.regex);

      // if (match) {
      //   console.log('MATCH ' + label + ':', match);
      // }
      return acc + (match?.length || 0);
    }, 0);
  }
}

// MOGELIJKHEDEN
// - horizontal left to right
// - horizontal right to left
// - vertical up to down
// - vertical down to up

// - diagonal left up to right down
// - diagonal right up to left down
// - diagonal left down to right up
// - diagonal right down to left up

// changeInputToDiagonal(
//   list: string[],
//   yIndexStart: number,
//   xIndexStart: number,
//   yIndexIncrement: number,
//   xIndexIncrement: number
// ) {
//   const diagonalInput = [];

//   for (let yIndex = 0; yIndex < list.length; yIndex++) {
//     let value = '';
//     let diagonalYIndex = yIndex;
//     let diagonalXIndex = xIndexStart;

//     while (true) {
//       if (
//         list[diagonalYIndex] === undefined ||
//         list[diagonalYIndex][diagonalXIndex] === undefined
//       ) {
//         break;
//       }
//       console.log(diagonalYIndex, diagonalXIndex);
//       // console.log(list[diagonalYIndex][diagonalXIndex]);

//       value += list[diagonalYIndex][diagonalXIndex];
//       diagonalYIndex = diagonalYIndex + yIndexIncrement;
//       diagonalXIndex = diagonalXIndex + xIndexIncrement;
//     }

//     diagonalInput.push(value);
//     console.log('-');
//   }
//   console.log('===');
//   return diagonalInput;
// }
