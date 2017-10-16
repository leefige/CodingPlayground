import Basic from "./Basic"
const elements = {
  empty : 0,
  character : 1,
  block : 2,
}
class Board extends Basic {
  constructor(state) {
    super(state);
    this.size = this._state.map.length;
    this.elements = elements;
  }
  map(x, y) {
    return this._state['map'][x][y];
  }
}

export default Board;
