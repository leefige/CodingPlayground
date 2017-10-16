import Board from "./Board"
import Character from "./Character"
class MainControl{
  constructor() {
    const map = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    this.board = new Board({ map : map });
    this.character = new Character({
      pos : { x : 0, y : 0},
      dir : 2,
    });
  }
  update() {
    this.character.update();
    this.board.update();
  }
}

let mainControl = new MainControl();
let board = mainControl.board;
let character = mainControl.character;
export {board, character, mainControl};
