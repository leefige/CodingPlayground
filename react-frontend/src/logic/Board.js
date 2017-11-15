import { gameStatus, elements, direction } from "./Constant"
import Basic from "./Basic"

class Board extends Basic {
  _size;
  _enemy;
  constructor(state, mainControl) {
    super(state, mainControl);
    //--- test ---
    this._state.torchPos = {x:-1, y:-1};
    this._nextState.torchPos = {x:-1, y:-1};
    //------------
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

  setTorch(pos) {
    // console.log(this._mainControl._state)
    // console.log(this._state)
    // console.log(this._nextState)
    // console.log("set torch")
    // console.log(pos)

    if (this.map[pos.x][pos.y] === elements.grass || this.map[pos.x][pos.y] === elements.fence ||
      this.map[pos.x][pos.y] === elements.empty) {
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

  setBomb(pos, dir) {
    if (this.map[pos.x][pos.y] === elements.grass || this.map[pos.x][pos.y] === elements.fence ||
      this.map[pos.x][pos.y] === elements.stone || this.map[pos.x][pos.y] === elements.empty) {
      this._nextState.bombPos.x = pos.x;
      this._nextState.bombPos.y = pos.y;
      this._nextState.map[pos.x][pos.y] = elements.empty;
      if (dir === direction.up || dir === direction.down) {

      }
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

  update() {
    //console.log(this._nextState)
    super.update();
    //console.log(this._state);
    this._nextState.torchPos = {x : -1, y : -1};
    this._nextState.bombPos = {x : -1, y : -1};
    this._nextState.bombArea = [];
  }
  get chestPos() { return this._chestPos; }
  get map() { return this._state.map; }
  get size() { return this._size; }
}

export default Board;
