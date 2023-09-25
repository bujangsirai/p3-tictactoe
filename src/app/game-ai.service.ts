import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameAiService {
  player = '';
  opponent = '';
  // Set Move Is Neccesary
  setMove(player: string, opponent: string) {
    this.player = player;
    this.opponent = opponent;
  }
  // let player = 'x', opponent = 'o';

  // This function returns true if there are moves
  // remaining on the board. It returns false if
  // there are no moves left to play.
  isMovesLeft(board: string[][]) {
    for (let i = 1; i <= 3; i++)
      for (let j = 1; j <= 3; j++) if (board[i][j] == '') return true;
    return false;
  }

  // This is the evaluation function as discussed
  // in the previous article ( http://goo.gl/sJgv68 )
  //! Player here is AI, Opponent here is US
  evaluate(b: string[][]) {
    // Checking for Rows for X or O victory.
    for (let row = 1; row <= 3; row++) {
      if (b[row][1] == b[row][2] && b[row][2] == b[row][3]) {
        if (b[row][1] == this.player) return +10;
        else if (b[row][1] == this.opponent) return -10;
      }
    }

    // Checking for Columns for X or O victory.
    for (let col = 1; col <= 3; col++) {
      if (b[1][col] == b[2][col] && b[2][col] == b[3][col]) {
        if (b[1][col] == this.player) return +10;
        else if (b[1][col] == this.opponent) return -10;
      }
    }

    // Checking for Diagonals for X or O victory.
    if (b[1][1] == b[2][2] && b[2][2] == b[3][3]) {
      if (b[1][1] == this.player) return +10;
      else if (b[1][1] == this.opponent) return -10;
    }

    if (b[1][3] == b[2][2] && b[2][2] == b[3][1]) {
      if (b[1][3] == this.player) return +10;
      else if (b[1][3] == this.opponent) return -10;
    }

    // Else if none of them have
    // won then return 0
    return 0;
  }

  // This is the minimax function. It
  // considers all the possible ways
  // the game can go and returns the
  // value of the board
  minimax(board: string[][], depth: number, isMax: boolean) {
    let score = this.evaluate(board);

    // If Maximizer has won the game
    // return his/her evaluated score
    if (score == 10) return score;

    // If Minimizer has won the game
    // return his/her evaluated score
    if (score == -10) return score;

    // If there are no more moves and
    // no winner then it is a tie
    if (this.isMovesLeft(board) == false) return 0;

    // If this maximizer's move
    if (isMax) {
      let best = -1000;

      // Traverse all cells
      for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
          // Check if cell is empty
          if (board[i][j] == '') {
            // Make the move
            board[i][j] = this.player;

            // Call minimax recursively
            // and choose the maximum value
            best = Math.max(best, this.minimax(board, depth + 1, !isMax));

            // Undo the move
            board[i][j] = '';
          }
        }
      }
      return best;
    }
    // If this minimizer's move
    else {
      let best = 1000;

      // Traverse all cells
      for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
          // Check if cell is empty
          if (board[i][j] == '') {
            // Make the move
            board[i][j] = this.opponent;

            // Call minimax recursively and
            // choose the minimum value
            best = Math.min(best, this.minimax(board, depth + 1, !isMax));

            // Undo the move
            board[i][j] = '';
          }
        }
      }
      return best;
    }
  }

  // This will return the best possible
  // move for the player
  findBestMove(board: string[][]) {
    let bestVal = -1000;
    let bestMove = { row: -1, col: -1 };

    // Traverse all cells, evaluate
    // minimax function for all empty
    // cells. And return the cell
    // with optimal value.
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        // Check if cell is empty
        if (board[i][j] == '') {
          // Make the move
          board[i][j] = this.player;

          // compute evaluation function
          // for this move.
          let moveVal = this.minimax(board, 0, false);

          // Undo the move
          board[i][j] = '';

          // If the value of the current move
          // is more than the best value, then
          // update best
          if (moveVal > bestVal) {
            bestMove.row = i;
            bestMove.col = j;
            bestVal = moveVal;
          }
        }
      }
    }

    return bestMove;
  }

  // Driver code

  // bestMove = this.findBestMove(board);

  // This code is contributed by rag2127
}
