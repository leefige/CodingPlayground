import { gameStatus } from "./MainControl"
import Basic from "./Basic"

const elements = {
  empty : 0,
  chest : 90,
  grass : 92,
  tree : 93,
  fence : 94,
  stone : 95,
  precipice: 96,
  pond: 97,
}

class Board extends Basic {
  _size;
  _elements;
  _enemy;
  constructor(state, mainControl) {
    super(state, mainControl);
    //--- test ---
    this._state.torchPos = {x:-1, y:-1};
    this._nextState.torchPos = {x:-1, y:-1};
    //------------
    this._enemy = this._mainControl.enemy;
    this._size = this._state.map.length;
    this._elements = elements;
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

    if (this.map[pos.x][pos.y] === this.elements.grass || this.map[pos.x][pos.y] === this.elements.fence ||
      this.map[pos.x][pos.y] === this.elements.empty) {
      this._nextState.torchPos.x = pos.x;
      this._nextState.torchPos.y = pos.y;
      this._nextState.map[pos.x][pos.y] = this.elements.empty;
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
  get elements() { return this._elements; }
}

export default Board;
