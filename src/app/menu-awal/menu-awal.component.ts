import { Component, inject } from '@angular/core';
import { GameStatService } from '../game-stat.service';
import { FormControl } from '@angular/forms';
import { GameAiService } from '../game-ai.service';

@Component({
  selector: 'app-menu-awal',
  templateUrl: './menu-awal.component.html',
  styleUrls: ['./menu-awal.component.css'],
})
export class MenuAwalComponent {
  console = console;
  gameStat = inject(GameStatService);
  aiMove = inject(GameAiService);
  pesanError = '';

  gameInitProps = {
    player1: 'temp1',
    player2: 'temp2',
    whoWin: '',
    onlineGame: false,
    modeName: 'temp3',
  };

  // LOCALLY PLAYED
  player1Name = new FormControl('');
  player2Name = new FormControl('');

  localStart(a: string, b: string) {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    if (a == '' || b == '') {
      this.pesanError = 'Nama pemain tidak boleh kosong';
      modal.showModal();
      return;
    }

    if (a == b) {
      this.pesanError = 'Nama pemain tidak boleh sama';
      modal.showModal();
      return;
    }

    this.gameInitProps.player1 = a;
    this.gameInitProps.player2 = b;
    this.gameStat.newGame(this.gameInitProps);

    // MAYBE THIS IS THE AI COMES
    // this.aiMove.setMove('X', 'O'); // X Will be AI
    this.aiMove.setMove('O', 'X'); // O Will be AI
  }

  // AI PLAYED
  playerName = new FormControl('');
  whatIPlay = new FormControl(false);

  // whatIPlay adalah sesuatu yang player isi, berarti AI adalah kontrapartnya
  // TRUE IS X
  // FALSE IS O

  // ITS MEAN, THE AI WILL PLAY
  // TRUE IS O
  // FALSE IS X
  AIStart(a: string, b: boolean) {
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    if (a == '') {
      this.pesanError = 'Nama pemain tidak boleh kosong';
      modal.showModal();
      return;
    }

    if (b) {
      this.gameInitProps.player1 = a;
      this.gameInitProps.player2 = 'AI';
      if (this.gameInitProps.player1 == this.gameInitProps.player2) {
        this.gameInitProps.player2 = 'AI2';
      }
      this.aiMove.setMove('O', 'X'); // X Will be AI
    } else {
      this.gameInitProps.player1 = 'AI';
      this.gameInitProps.player2 = a;
      if (this.gameInitProps.player1 == this.gameInitProps.player2) {
        this.gameInitProps.player1 = 'AIChange';
      }
      this.aiMove.setMove('X', 'O'); // X Will be AI
    }

    this.console.log(b);
    this.gameStat.newGame(this.gameInitProps);
    this.gameStat.aiMove();
  }
}
