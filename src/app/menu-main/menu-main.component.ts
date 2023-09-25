import { Component, inject } from '@angular/core';
import { GameStatService } from '../game-stat.service';
import { GameAiService } from '../game-ai.service';

@Component({
  selector: 'app-menu-main',
  templateUrl: './menu-main.component.html',
  styleUrls: ['./menu-main.component.css'],
})
export class MenuMainComponent {
  gameStat = inject(GameStatService);
  aiMove = inject(GameAiService);
  console = console;
}
