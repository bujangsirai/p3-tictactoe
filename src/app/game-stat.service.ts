import { Injectable, Signal, signal } from '@angular/core';
import { GameAiService } from './game-ai.service';

@Injectable({
  providedIn: 'root',
})
export class GameStatService {
  constructor(private ai: GameAiService) {}

  //#region DECLARATION
  // Declaration set in new game, except mainMenu, isDraw , modeSelected , modeNumber
  mainMenu = signal(false);
  isDraw = signal(false);
  modeSelected = signal(false);
  modeNumber = signal(0);

  numClick = signal(0);
  player1 = signal('');
  player2 = signal('');
  whoWin = signal('');
  onlineGame = signal(false);
  modeName = signal('');
  turnWho = signal('X');
  isiBoard = signal([
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
  ]);
  //#endregion

  //#region GAMEUTILITY - GAMEINIT
  newGame(gameInit: any) {
    this.numClick = signal(0);
    this.player1 = signal(gameInit.player1);
    this.player2 = signal(gameInit.player2);
    this.whoWin = signal(gameInit.whoWin);

    this.onlineGame = signal(gameInit.onlineGame);
    this.modeName = signal(gameInit.modeName);

    this.turnWho.set('X');
    this.isiBoard.set([
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
    ]);

    this.gantiMenu();
  }
  //#endregion

  //#region GAMEUTILITY - GAMECONTROL
  gantiMenu() {
    this.mainMenu.set(!this.mainMenu());
    this.modeSelected.set(false);
  }

  gantiModeSelected(num: number) {
    this.modeSelected.set(!this.modeSelected());
    this.modeNumber.set(num);
  }

  giliranP1() {
    if (this.turnWho() == 'X') {
      return true;
    } else {
      return false;
    }
  }
  //#endregion

  //#region GAMEUTILITY - BOARDACTION
  clickedKah(row: number, col: number) {
    if (this.isiBoard()[row][col] == '' && this.whoWin() == '') {
      this.clickRow(row, col);
      this.aiMove();
    }
  }

  clickRow(row: number, col: number) {
    if (this.turnWho() == 'X') {
      this.isiBoard()[row][col] = 'X';
      this.turnWho.set('O');
    } else {
      this.isiBoard()[row][col] = 'O';
      this.turnWho.set('X');
    }
    this.numClick.set(this.numClick() + 1);
    this.winGame();
  }

  aiMove() {
    // EVALUATE THE AI :
    // IF AI = X then check WHEN X
    // IF AI = O then check WHEN O

    console.log('Jalan Bro');
    console.log(this.turnWho());
    console.log(this.ai.player);

    if (this.turnWho() == 'O' && this.ai.player == 'O') {
      let BestMoveRN = this.ai.findBestMove(this.isiBoard());
      this.clickedKah(BestMoveRN.row, BestMoveRN.col);
      console.log('BestMoveRN');
      console.log(BestMoveRN);
    } else if (this.turnWho() == 'X' && this.ai.player == 'X') {
      let BestMoveRN = this.ai.findBestMove(this.isiBoard());
      this.clickedKah(BestMoveRN.row, BestMoveRN.col);
      console.log('BestMoveRN');
      console.log(BestMoveRN);
    }
  }
  //#endregion

  //#region GAMEUTILITY - WINCONDITION
  winGame() {
    // pola vertikal
    const polaWin = [];
    polaWin.push(
      this.isiBoard()[1][1] + this.isiBoard()[2][1] + this.isiBoard()[3][1]
    );
    polaWin.push(
      this.isiBoard()[1][2] + this.isiBoard()[2][2] + this.isiBoard()[3][2]
    );
    polaWin.push(
      this.isiBoard()[1][3] + this.isiBoard()[2][3] + this.isiBoard()[3][3]
    );

    // pola horizontal
    polaWin.push(
      this.isiBoard()[1][1] + this.isiBoard()[1][2] + this.isiBoard()[1][3]
    );
    polaWin.push(
      this.isiBoard()[2][1] + this.isiBoard()[2][2] + this.isiBoard()[2][3]
    );
    polaWin.push(
      this.isiBoard()[3][1] + this.isiBoard()[3][2] + this.isiBoard()[3][3]
    );

    // pola diagonal
    polaWin.push(
      this.isiBoard()[1][1] + this.isiBoard()[2][2] + this.isiBoard()[3][3]
    );
    polaWin.push(
      this.isiBoard()[1][3] + this.isiBoard()[2][2] + this.isiBoard()[3][1]
    );

    // check if win
    for (let i = 0; i < polaWin.length; i++) {
      if (polaWin[i] == 'XXX') {
        this.whoWin.set(this.player1());
        return true;
      } else if (polaWin[i] == 'OOO') {
        this.whoWin.set(this.player2());
        return true;
      }
    }

    // check if draw
    if (this.numClick() == 9) {
      this.whoWin.set('GAME END SET DRAW');
      this.isDraw.set(true);
      return true;
    }
    return false;
  }
  //#endregion

  //#region GAMEUTILITY - GAMEASSETS
  playerIcon(player: string) {
    if (player == this.player1()) {
      return 'assets/close2';
    } else {
      return 'assets/record2';
    }
  }
  //#endregion
}
