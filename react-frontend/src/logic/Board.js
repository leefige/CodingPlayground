import Basic from "./Basic"
const elements = {
  empty : 0,
  chest : 1,
  barrier : 2,
  grass : 4,
  stone : 5,
}
class Board extends Basic {
  _size;
  _elements;
  constructor(state) {
    super(state);
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
  get chestPos() { return this._chestPos; }
  get map() { return this._state.map; }
  get size() { return this._size; }
  get elements() { return this._elements; }
}

export default Board;
