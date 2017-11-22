import { gameStatus, elements, direction } from "./Constant"
import Basic from "./Basic"

class Board extends Basic {
  _size;
  _enemy;
  constructor(state, mainControl) {
    super(state, mainControl);
    this._size = this._state.map.length;
    this._chestPos = { x : -1, y : -1};
    // get treasurePos
    for (let i = 0; i < this._size; i++) {
      for (let j = 0; j < this._size; j++) {
        if (this.map[i][j] === elements.chest) {
          this._chestPos = { x:i, y:j};
        }
      }
    }
  }

  canSetTorch(pos) {
    if (pos.x < 0 || pos.x >= this.size || pos.y < 0 || pos.y >= this.size)
      return false;
    return (this.map[pos.x][pos.y] === elements.grass || this.map[pos.x][pos.y] === elements.fence || this.map[pos.x][pos.y] === elements.empty);
  }

  setTorch(pos) {
    if (this.canSetTorch(pos)) {
      this._nextState.torchPos.x = pos.x;
      this._nextState.torchPos.y = pos.y;
      this._nextState.map[pos.x][pos.y] = elements.empty;
      return gameStatus.running;
    }
    else
      return gameStatus.failed;
  }

  canSetBomb(pos) {
    if (pos.x < 0 || pos.x >= this.size || pos.y < 0 || pos.y >= this.size)
    return false;
    return (this.map[pos.x][pos.y] === elements.grass || this.map[pos.x][pos.y] === elements.fence ||
      this.map[pos.x][pos.y] === elements.stone || this.map[pos.x][pos.y] === elements.empty);
  }

  bombKillEnemy(pos) {
    const enemy = this._mainControl.enemy;
    for (let i = 0; i < enemy.length; i++) {
      if (pos.x === enemy[i].pos.x && pos.y === enemy[i].pos.y && enemy[i].status === 'alive') {
        enemy[i].killed();
      }
    }
  }

  // add bomb area effect and kill enemy if possible
  setBombArea(pos) {
    if (this.canSetBomb(pos)) {
      this._nextState.map[pos.x][pos.y] = elements.empty;
      this._nextState.bombArea.push({x : pos.x, y: pos.y});
      this.bombKillEnemy(pos);
    }
  }
  setBomb(pos, dir) {
    if (this.canSetBomb(pos)) {
      this._nextState.bombPos.x = pos.x;
      this._nextState.bombPos.y = pos.y;
      this.setBombArea(pos)
      if (dir === direction.up || dir === direction.down) {
        this.setBombArea({x : pos.x, y: pos.y + 1});
        this.setBombArea({x : pos.x, y: pos.y - 1});
      }
      else if (dir === direction.left || dir === direction.right) {
        this.setBombArea({x : pos.x + 1, y: pos.y});
        this.setBombArea({x : pos.x - 1, y: pos.y});
      }
      return gameStatus.running;
    }
    else
      return gameStatus.failed;
  }

  update() {
    super.update();
    this.resetNextState();
  }

  resetNextState() {
    this._nextState.torchPos = {x : -1, y : -1};
    this._nextState.bombPos = {x : -1, y : -1};
    this._nextState.bombArea = [];
  }
  get chestPos() { return this._chestPos; }
  get map() { return this._state.map; }
  get size() { return this._size; }
}

export default Board;
