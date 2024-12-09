import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DayComponent } from '../day/day.component';

@Component({
  selector: 'app-day-5-1',
  imports: [CommonModule],
  templateUrl: './day-5-1.component.html',
  styleUrl: './day-5-1.component.scss',
})
export class Day51Component extends DayComponent implements OnInit {
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
    // console.log({ pageOrdeningRules, updates });

    const matchingUpdates = this.findMatchingUpdates(
      pageOrdeningRules,
      updates
    );
    // console.log('matchingUpdates', matchingUpdates);

    const middlePageNumbers = matchingUpdates.map(
      (update) => update[Math.floor(update.length / 2)]
    );
    // console.log('middlePageNumbers', middlePageNumbers);

    this.result = middlePageNumbers.reduce(
      (acc, value) => acc + parseInt(value, 10),
      0
    );

    console.log('=====');
    console.log(`Day 5.1 result: ${this.result}`);
  }

  findMatchingUpdates(pageOrdeningRules: string[][], updates: string[][]) {
    return updates.filter((update, index) => {
      // console.log('> UPDATE ' + index);
      const enabledRules = this.findEnabledRules(pageOrdeningRules, update);
      const matchingRules = this.findMatchingRules(enabledRules, update);
      // console.log('enabledRules', enabledRules);
      // console.log('matchingRules', matchingRules);
      // console.log('');

      return enabledRules.length === matchingRules.length;
    });
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
}
