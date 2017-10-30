import Unit from "./Unit"
import {board} from "./MainControl"
// 方向: up:0, right:1, down:2, left:3 
class Character extends Unit {
  _board;
  constructor(state, board) {
    super(state)
    this._board = board;
  }
  turnLeft() {
    console.log('trun left');
    if (this.dir === 0)
      this._nextState.dir = 3;
    else
      this._nextState.dir = this.dir - 1;
    return 1;
  }

  turnRight() {
    console.log('trun right');
    if (this.dir === 3)
      this._nextState.dir = 0;
    else
      this._nextState.dir = this.dir + 1;
    return 1;
  }

  go() {
    console.log('go');
    console.log(this.pos);
    const dir = this.dir;
    const pos = this.pos;
    let nextPos = pos;
    if (dir === 0)
      nextPos = { x : pos.x - 1, y : pos.y };
    else if (dir === 1)
      nextPos = { x : pos.x, y : pos.y + 1};
    else if (dir === 2)
      nextPos = { x : pos.x + 1, y : pos.y};
    else if (dir === 3)
      nextPos = { x : pos.x, y : pos.y - 1};
    console.log(nextPos)
    if (nextPos.x < 0 || nextPos.x >= this._board.size || nextPos.y < 0 || nextPos.y >= this._board.size)
      return 3;
    if (this._board.map[nextPos.x][nextPos.y] === this._board.elements['block'])
      return 3;
      this._nextState.pos = nextPos;
    console.log(nextPos)
    return 1;
  }
}

export default Character;