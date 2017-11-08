import Board from "./Board";
import Character from "./Character";
import Enemy from "./Enemy";
import Player from "./Player";
import { playerStatus } from "./Player"
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
    dir : 2
  },
  enemy : [
    {
      pos : { x : 1, y : 1},
      dir : 2,
      status : 'alive',
      turningPoint : [
        {
          pos : { x : 2, y : 1},
          dir : 1,
        },
        {
          pos : { x : 2, y : 2},
          dir : 0,
        },
        {
          pos : { x : 1, y : 2},
          dir : 3,
        },
        {
          pos : { x : 1, y : 1},
          dir : 2,
        },
      ]
    },
  ],
}

const actionTable = {
  go : '1',
  turnLeft : '2',
  turnRight : '3',
  attack : '4',
  torch : '5',
  bomb : '6',
  open : '7',
}

class MainControl{
  _state;
  _board;
  _character;
  _enemy;
  _player;
  _status;
  constructor(state) {
    this.load(state);
  }
  
  load(state) {
    this._state = JSON.parse(JSON.stringify(state));
    this._board = new Board(this._state.board);
    this._enemy = [];
    for (let i = 0; i < this._state.enemy.length; i++)
      this._enemy[i] = new Enemy(this._state.enemy[i])
    this._character = new Character(this._state.character, this._board, this._enemy);
    this._player = new Player(state);
    this._status = 1; //游戏状态，0为初始状态，1为正常运行，2为胜利，3为失败, 4为暂停
  }

  restart(state) {
    this.load(state);
    this._player.setNextStatus(playerStatus.running);
    this._player.setMode('normal');
  }

  reset(state) {
    this.load(state);
    this._player.setNextStatus(playerStatus.pause);
  }

  // init for step-through mode
  stepThrough(state) {
    this.load(state);
    this._player.setNextStatus(playerStatus.running);
    this._player.setMode('step');
  }

  addActionList(actionList) {
    actionList.forEach((action => {
      if (this._status === 1) {
        switch(action) {
          case actionTable.go:
            this._status = this._character.go();
            break;
          case actionTable.turnLeft:
            this._status = this._character.turnLeft();
            break;
          case actionTable.turnRight:
            this._status = this._character.turnRight();
            break;
          case actionTable.attack:
            this._status = this._character.attack();
            break;
          case actionTable.torch:
            //this._status = this._character.turnRight();
            break;
          case actionTable.bomb:
            //this._status = this._character.turnRight();
            break;
          case actionTable.open:
            //this._status = this._character.open();
            break;
          
        }
        // calcutale enemy's next pos and dir
        for (let i = 0; i < this._enemy.length; i++) {
          this._enemy[i].go();
        }
        // update all units
        this.update();
        if (this.isOver()) {
          this._status = 3;
        }
      }
      if (this._status !== 1) {
        this._player.setResult(this._status);
      } //游戏结束
    }))
    if (this._player.getMode() === 'step')
      this._player.run();
  }
  
  isOver() {
    for (let i = 0; i < this._enemy.length; i++) {
      if (this._enemy[i].pos.x === this._character.pos.x && this._enemy[i].pos.y === this._character.pos.y && this._enemy[i].status === "alive")
        return true;
    }
    return false;
  }

  update() {
    this._character.update();
    for (let i = 0; i < this._enemy.length; i++)
      this._enemy[i].update();
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