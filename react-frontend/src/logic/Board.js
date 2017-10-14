import Basic from "./Basic"
class Board extends Basic {
  constructor(state) {
    super(state);
    this.size = 11;
    this.elements = {
      empty : 0,
      character : 1,
      block : 2,
    }
    this._state.map = new Array(this.size); 
    for(let i = 0; i < this.size; i++) {  
      this._state.map[i] = new Array(this.size); 
    }
  }
  map(x, y) {
    return this._state.map[x][y];
  }
}

let board = new Borad(null);
export {board};
