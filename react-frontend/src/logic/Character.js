import Unit from "./Unit"
import {board} from "./MainControl"
// 方向: up:0, right:1, down:2, left:3 
class Character extends Unit {
  _board;
  constructor(state, board, enemy) {
    super(state)
    this._board = board;
    this._enemy = enemy;
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
    if (this._board.map[nextPos.x][nextPos.y] === this._board.elements.barrier)
      return 3;
    this._nextState.pos = nextPos;
    return 1;
  }

  // attack the enemy in front of character
  attack() {
    let attackPos = this.getNextPos();
    for (let i = 0; i < this._enemy.length; i++) {
      if (attackPos.x === this._enemy[i].pos.x && attackPos.y === this._enemy[i].pos.y && this._enemy[i].status == 'alive')
        this._enemy[i].killed();
    }
    return 1;
  }

  // open the treasure in front of character
  open() {
    let nextPos = this.getNextPos();
    if (nextPos.x < 0 || nextPos.x >= this._board.size || nextPos.y < 0 || nextPos.y >= this._board.size)
      return 3;
    if (this._board.map[nextPos.x][nextPos.y] === this._board.elements.treasure)
      return 2;
    return 3;
  }
}

export default Character;