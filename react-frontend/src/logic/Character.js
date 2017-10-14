import Unit from "./Unit"
import { board } from "./Borad"
// 方向: up:0, right:1, down:2, left:3 
class Character extends Basic {
  constructor() {
    super();
  }

  turnLeft() {
    if (this.dir() == 0)
      this._nextState.dir = 3;
    else
      this._nextState.dir = this.dir() - 1;
  }

  turnRight() {
    if (this.dir() == 0)
      this._nextState.dir = 3;
    else
      this._nextState.dir = this.dir() - 1;
  }

  go() {
    const dir = this.dir();
    const pos = this.pos();
    if (dir == 0 && pos.x - 1 >= 0 && board.map(pos.x - 1, pos.y) != board.elements['block'])
      this._nextState.pos = { x : pos.x - 1, y : pos.y};
    else if (dir == 1 && pos.y + 1 < board.size && board.map(pos.x, pos.y + 1) != board.elements['block'])
      this._nextState.pos = { x : pos.x, y : pos.y + 1};
    else if (dir == 2 && pos.x + 1 < board.size && board.map(pos.x + 1, pos.y) != board.elements['block'])
      this._nextState.pos = { x : pos.x + 1, y : pos.y};
    else if (dir == 3 && pos.y - 1 >= 0 && board.map(pos.x, pos.y - 1) != board.elements['block'])
      this._nextState.pos = { x : pos.x, y : pos.y - 1};
  }
}
