import { Component } from '@angular/core';
// import { Day11Component } from './components/day-1-1/day-1-1.component';
// import { Day12Component } from './components/day-1-2/day-1-2.component';
// import { Day21Component } from './components/day-2-1/day-2-1.component';
// import { Day22Component } from './components/day-2-2/day-2-2.component';
import { Day31Component } from './components/day-3-1/day-3-1.component';
import { Day32Component } from './components/day-3-2/day-3-2.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    // Day11Component, Day12Component,
    // Day21Component, Day22Component,
    Day31Component,
    Day32Component,
  ],
})
export class AppComponent {
  title = 'Advent of code 2024';
}
