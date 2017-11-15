import { gameStatus, elements, direction } from "./Constant"
import Basic from "./Basic"

class Board extends Basic {
  _size;
  _enemy;
  constructor(state, mainControl) {
    super(state, mainControl);
    this._enemy = this._mainControl.enemy;
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
    // console.log(this._mainControl._state)
    // console.log(this._state)
    // console.log(this._nextState)
    // console.log("set torch")
    // console.log(pos)

    if (this.canSetTorch(pos)) {
      this._nextState.torchPos.x = pos.x;
      this._nextState.torchPos.y = pos.y;
      this._nextState.map[pos.x][pos.y] = elements.empty;
      // console.log(pos)
      // console.log(this._nextState)
      // console.log(this._nextState.torchPos)
      // console.log(this._nextState.torchPos.x)
      // console.log(this._nextState.torchPos.y)

      // console.log("set torch success")
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

  setBomb(pos, dir) {
    if (this.canSetBomb(pos)) {
      this._nextState.bombPos.x = pos.x;
      this._nextState.bombPos.y = pos.y;
      this._nextState.map[pos.x][pos.y] = elements.empty;
      this._nextState.bombArea.push({x : pos.x, y: pos.y});
      let nextPos;
      if (dir === direction.up || dir === direction.down) {
        nextPos = {x : pos.x, y: pos.y + 1};
        if (this.canSetBomb(nextPos)) {
          this._nextState.map[nextPos.x][nextPos.y] = elements.empty;
          this._nextState.bombArea.push({x : nextPos.x, y: nextPos.y});
        }
        nextPos = {x : pos.x, y: pos.y - 1};
        if (this.canSetBomb(nextPos)) {
          this._nextState.map[nextPos.x][nextPos.y] = elements.empty;
          this._nextState.bombArea.push({x : nextPos.x, y: nextPos.y});
        }
      }
      else if (dir === direction.left || dir === direction.right) {
        nextPos = {x : pos.x + 1, y: pos.y};
        if (this.canSetBomb(nextPos)) {
          this._nextState.map[nextPos.x][nextPos.y] = elements.empty;
          this._nextState.bombArea.push({x : nextPos.x, y: nextPos.y});
        }
        nextPos = {x : pos.x - 1, y: pos.y};
        if (this.canSetBomb(nextPos)) {
          this._nextState.map[nextPos.x][nextPos.y] = elements.empty;
          this._nextState.bombArea.push({x : nextPos.x, y: nextPos.y});
        }
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
