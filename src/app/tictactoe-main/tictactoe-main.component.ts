import { Component, inject} from '@angular/core';
import { GameStatService } from '../game-stat.service';

@Component({
  selector: 'app-tictactoe-main',
  templateUrl: './tictactoe-main.component.html',
  styleUrls: ['./tictactoe-main.component.css'],
})
export class TictactoeMainComponent {
  gameStat = inject(GameStatService);
}
