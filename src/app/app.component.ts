import { Component } from '@angular/core';
import { Day11Component } from './components/day-1-1/day-1-1.component';
import { Day12Component } from './components/day-1-2/day-1-2.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [Day11Component, Day12Component],
})
export class AppComponent {
  title = 'Advent of code 2024';
}
