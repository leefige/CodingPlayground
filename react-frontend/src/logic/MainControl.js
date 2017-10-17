import Board from "./Board"
import Character from "./Character"
const state = {
  board : {
    map : [[0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]],
  },
  character : {
    pos : { x : 0, y : 0},
    dir : 2,
  },
}
class MainControl{
  _state;
  _board;
  _character;
  constructor(state) {
    this._state = state;
    this._board = new Board(state['board']);
    this._character = new Character(state.character);
  }
  update() {
    this._character.update();
    this._board.update();
  }
  get character() { return this._character; }
  get board() { return this._board; }
}

let mainControl = new MainControl(state);
let board = mainControl.board;
let character = mainControl.character;
export {board, character, mainControl};
