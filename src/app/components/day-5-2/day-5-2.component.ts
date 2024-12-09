import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DayComponent } from '../day/day.component';

@Component({
  selector: 'app-day-5-2',
  imports: [CommonModule],
  templateUrl: './day-5-2.component.html',
  styleUrl: './day-5-2.component.scss',
})
export class Day52Component extends DayComponent implements OnInit {
  constructor(private httpClient: HttpClient) {
    super();
  }

  ngOnInit() {
    this.httpClient
      // .get('assets/day-5/example-input.txt', { responseType: 'text' })
      .get('assets/day-5/input.txt', { responseType: 'text' })
      .subscribe((data: any) => {
        this.process(data);
      });
  }

  override process(data: string) {
    const sanitizedInput = data.split('\n').slice(0, -1);
    // console.log('sanitizedInput', sanitizedInput);

    const pageOrdeningRules = sanitizedInput
      .slice(0, sanitizedInput.indexOf(''))
      .map((value) => value.split('|'));
    const updates = sanitizedInput
      .slice(sanitizedInput.indexOf('') + 1)
      .map((value) => value.split(','));

    const fixedNotMatchingUpdates = this.fixNotMatchingUpdates(
      pageOrdeningRules,
      updates
    );
    // console.log('fixedNotMatchingUpdates', fixedNotMatchingUpdates);

    const middlePageNumbers = fixedNotMatchingUpdates
      .filter((update) => update !== undefined)
      .map((update) => update[Math.floor(update.length / 2)]);

    this.result = middlePageNumbers.reduce(
      (acc, value) => acc + parseInt(value, 10),
      0
    );

    console.log('=====');
    console.log(`Day 5.2 result: ${this.result}`);
  }

  fixNotMatchingUpdates(pageOrdeningRules: string[][], updates: string[][]) {
    return updates.reduce((acc, update, index) => {
      const enabledRules = this.findEnabledRules(pageOrdeningRules, update);
      const matchingRules = this.findMatchingRules(enabledRules, update);
      // const notMatchingRules = this.findNotMatchingRules(enabledRules, update);

      if (enabledRules.length !== matchingRules.length) {
        // console.log('> UPDATE ' + index);
        // console.log('update', update);
        // console.log('enabledRules', enabledRules);
        // console.log('matchingRules', matchingRules);
        // console.log('notMatchingRules', notMatchingRules);

        const reorderedUpdate = update.slice();
        this.generateReorderedUpdate(reorderedUpdate, enabledRules);
        // console.log('reorderedUpdate', reorderedUpdate);

        acc.push(reorderedUpdate);
        console.log();
      }

      return acc;
    }, [] as string[][]);
  }

  findEnabledRules(rules: string[][], update: string[]) {
    return rules.filter((rule) => {
      return update.includes(rule[0]) && update.includes(rule[1]);
    });
  }

  findMatchingRules(rules: string[][], update: string[]) {
    return rules.filter((rule) => {
      return update.indexOf(rule[0]) < update.indexOf(rule[1]);
    });
  }

  findNotMatchingRules(rules: string[][], update: string[]) {
    return rules.filter((rule) => {
      return update.indexOf(rule[0]) >= update.indexOf(rule[1]);
    });
  }

  generateReorderedUpdate(update: string[], enabledRules: string[][]) {
    const notMatchingRules = this.findNotMatchingRules(enabledRules, update);
    // console.log({ update, notMatchingRules });

    if (notMatchingRules.length === 0) {
      return;
    }

    const rulePageNumber0 = notMatchingRules[0][0];
    const rulePageNumber1 = notMatchingRules[0][1];

    this.array_move(
      update,
      update.indexOf(rulePageNumber0),
      update.indexOf(rulePageNumber1)
    );

    this.generateReorderedUpdate(update, enabledRules);
  }

  // Source: https://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
  array_move(arr: string[], old_index: number, new_index: number) {
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
  }
}

// [1] ATTEMPT WITH INNER MOVES
// generateReorderedUpdates(update: string[]) {
//   const ltrUpdate = update;
//   const rtlUpdate = update.toReversed();
//   return update
//     .map((_, characterIndex) => {
//       const list = [];
//       for (let index = 0; index < update.length; index) {
//         if (characterIndex + index < update.length) {
//           const ltrMove = this.array_move(
//             ltrUpdate.slice(),
//             characterIndex,
//             characterIndex + index
//           );
//           const rtlMove = this.array_move(
//             rtlUpdate.slice(),
//             characterIndex,
//             characterIndex + index
//           );
//           list.push(ltrMove);
//           list.push(rtlMove.toReversed());
//           // for (let innerIndex = 0; innerIndex < update.length; innerIndex) {
//           //   if (innerIndex !== characterIndex) {
//           //     for (
//           //       let innerInnerIndex = 0;
//           //       innerInnerIndex < update.length;
//           //       index
//           //     ) {
//           //       if (innerIndex + innerInnerIndex < update.length) {
//           //         const innerLtrMove = this.array_move(
//           //           ltrUpdate.slice(),
//           //           innerIndex,
//           //           innerIndex + innerInnerIndex
//           //         );
//           //         const innerRtlMove = this.array_move(
//           //           rtlUpdate.slice(),
//           //           innerIndex,
//           //           innerIndex + innerInnerIndex
//           //         ).toReversed();
//           //         list.push(innerLtrMove);
//           //         list.push(innerRtlMove);
//           //       }
//           //       innerInnerIndex++;
//           //     }
//           //   }
//           //   innerIndex++;
//           // }
//         }
//         index++;
//       }
//       return list;
//     })
//     .flat();
// }

// [2] ATTEMPT WTH SHUFFLE INPUT
// generateReorderedUpdates(rules: string[][], update: string[]) {
//   const newValue = update.slice();
//
//   while (true) {
//     this.shuffle(newValue);
//     const matches = this.findMatchingRules(rules, newValue);
//     if (matches.length === rules.length) {
//       break;
//     }
//   }
//   return newValue;
// }
// Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// shuffle(array: string[]) {
//   let currentIndex = array.length;
//   // While there remain elements to shuffle...
//   while (currentIndex !== 0) {
//     // Pick a remaining element...
//     let randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;
//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }
// }

// [3] ATTEMPT WITH BRUTE FORCE
// generateReorderedUpdates(update: string[]): string[][] {
//   if (update.length <= 2) {
//     return update.length === 2 ? [update, [update[1], update[0]]] : [update];
//   }
//   return update.reduce(
//     (acc, item, i) =>
//       acc.concat(
//         this.generateReorderedUpdates([
//           ...update.slice(0, i),
//           ...update.slice(i + 1),
//         ]).map((value) => [item, ...value])
//       ),
//     [] as string[][]
//   );
// }
