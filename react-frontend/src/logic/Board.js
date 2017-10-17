import Basic from "./Basic"
const elements = {
  empty : 0,
  character : 1,
  block : 2,
}
class Board extends Basic {
  _size;
  _elements;
  constructor(state) {
    super(state);
    this._size = this._state.map.length;
    this._elements = elements;
  }
  map(x, y) {
    return this._state['map'][x][y];
  }

  get size() { return this._size; }
  get elements() { return this._elements; }
}

export default Board;
