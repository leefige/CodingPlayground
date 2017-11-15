import Board from "./Board";
import Character from "./Character";
import Enemy from "./Enemy";
import Player from "./Player";
import { actionTable, defaultState, gameStatus} from "./Constant";
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
    //console.log("maincontrol")
    this._state = JSON.parse(JSON.stringify(state));
    //console.log(this._state)
    this._board = new Board(this._state.board, this);
    this._enemy = [];
    for (let i = 0; i < this._state.enemy.length; i++)
      this._enemy[i] = new Enemy(this._state.enemy[i], this)
    this._character = new Character(this._state.character, this);
    this._player = new Player(state);
    this._status = gameStatus.running;
  }

  restart(state) {
    this.load(state);
    this._player.setNextStatus(gameStatus.running);
    this._player.setMode('normal');
  }

  reset(state) {
    this.load(state);
    this._player.setNextStatus(gameStatus.pause);
  }

  // init for step-through mode
  stepThrough(state) {
    this.load(state);
    this._player.setNextStatus(gameStatus.running);
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
            this._status = this._character.useTorch();
            break;
          case actionTable.bomb:
            this._status = this._character.useBomb();
            break;
          case actionTable.open:
            this._status = this._character.open();
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
  get enemy() { return this._enemy; }
}

const mainControl = new MainControl(defaultState);

export { mainControl };
