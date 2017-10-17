import Board from "./Board"
import Character from "./Character"
import Player from "./Player"

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
  _player;

  constructor(state) {
    this._state = JSON.parse(JSON.stringify(state));
    this._board = new Board(this._state.board);
    this._character = new Character(this._state.character, this._board);
    this._player = new Player();
    this._player.add(this._state);
  }

  update() {
    this._character.update();
    this._board.update();
    this.save();
  }

  save() {
    this._player.add(this._state);
  }
  get character() { return this._character; }
  get board() { return this._board; }
  get player() { return this._player; }
}

export default MainControl;