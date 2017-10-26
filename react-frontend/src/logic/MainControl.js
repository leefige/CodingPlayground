import Board from "./Board";
import Character from "./Character";
import Player from "./Player";

const state = {
  board : {
    map : [[0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0, 0, 0, 0]],
  },
  character : {
    pos : { x : 4, y : 4},
    dir : 2,
  },
}

class MainControl{
  _state;
  _board;
  _character;
  _player;
  _status;

  constructor(state) {
    this.load(state);
  }

  load(state) {
    this._state = JSON.parse(JSON.stringify(state));
    this._board = new Board(this._state.board);
    this._character = new Character(this._state.character, this._board);
    this._player = new Player();
    this._player.add(this._state);
    this._status = 1; //游戏状态，1为正常运行，2为胜利，3为失败
  }

  addActionList(actionList) {
    actionList.forEach((action => {
      if (this._status == 1) {
        switch(action) {
          case '1':
            this._status = this._character.go();
            break;
          case '2':
            this._status = this._character.turnLeft();
            break;
          case '3':
            this._status = this._character.turnRight();
            break;
        }
        this.update();
      }
      else
        this._player.setResult(this._status); //游戏结束
      }))
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

const mainControl = new MainControl(state);

export { mainControl };