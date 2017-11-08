import Basic from "./Basic"
const elements = {
  empty : 0,
  treasure : 1,
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
  }
  get map() { return this._state.map; }
  get size() { return this._size; }
  get elements() { return this._elements; }
}

export default Board;
