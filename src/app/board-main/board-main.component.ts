import { Component, inject } from '@angular/core';
import { GameStatService } from '../game-stat.service';

@Component({
  selector: 'app-board-main',
  templateUrl: './board-main.component.html',
  styleUrls: ['./board-main.component.css'],
})
export class BoardMainComponent {
  console = console;
  gameStat = inject(GameStatService);
}
