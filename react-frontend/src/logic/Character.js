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
    if (this.dir === 0)
      this._nextState.dir = 3;
    else
      this._nextState.dir = this.dir - 1;
    return 1;
  }

  turnRight() {
    if (this.dir === 3)
      this._nextState.dir = 0;
    else
      this._nextState.dir = this.dir + 1;
    return 1;
  }

  go() {
    let nextPos = this.getNextPos();
    if (nextPos.x < 0 || nextPos.x >= this._board.size || nextPos.y < 0 || nextPos.y >= this._board.size)
      return 3;
    if (this._board.map[nextPos.x][nextPos.y] === this._board.elements.block)
      return 3;
    this._nextState.pos = nextPos;
    return 1;
  }

  // open the treasure in front of character
  open() {
    let nextPos = this.getNextPos();
    if (nextPos.x < 0 || nextPos.x >= this._board.size || nextPos.y < 0 || nextPos.y >= this._board.size)
      return 1;//打开错宝箱了算失败吗？？？？
    if (this._board.map[nextPos.x][nextPos.y] === this._board.elements.treasure)
      return 2;
    return 1;//打开错宝箱了算失败吗？？？？
  }
}

export default Character;