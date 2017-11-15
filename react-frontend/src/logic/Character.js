import Unit from "./Unit"
import { gameStatus } from "./MainControl"

const direction = {
  up : 0,
  right : 1,
  down : 2,
  left : 3,
}
// 方向: up:0, right:1, down:2, left:3
class Character extends Unit {
  _board;
  constructor(state, mainControl) {
    super(state, mainControl)
    this._board = this._mainControl.board;
    this._enemy = this._mainControl.enemy;
  }

  turnLeft() {
    if (this.dir === direction.up)
      this._nextState.dir = direction.left;
    else
      this._nextState.dir = this.dir - 1;
    return gameStatus.running;
  }

  turnRight() {
    if (this.dir === direction.left)
      this._nextState.dir = direction.up;
    else
      this._nextState.dir = this.dir + 1;
    return gameStatus.running;
  }

  go() {
    let nextPos = this.getNextPos();
    if (nextPos.x < 0 || nextPos.x >= this._board.size || nextPos.y < 0 || nextPos.y >= this._board.size)
      return gameStatus.failed;
    if (this._board.map[nextPos.x][nextPos.y] !== this._board.elements.empty)
      return gameStatus.failed;
    this._nextState.pos = nextPos;
    return gameStatus.running;
  }

  // attack the enemy in front of character
  attack() {
    let attackPos = this.getNextPos();
    for (let i = 0; i < this._enemy.length; i++) {
      if (attackPos.x === this._enemy[i].pos.x && attackPos.y === this._enemy[i].pos.y && this._enemy[i].status === 'alive')
        this._enemy[i].killed();
    }
    return gameStatus.running;
  }

  // open the treasure in front of character
  open() {
    const nextPos = this.getNextPos();
    if (nextPos.x < 0 || nextPos.x >= this._board.size || nextPos.y < 0 || nextPos.y >= this._board.size)
      return gameStatus.failed;
    if (this._board.map[nextPos.x][nextPos.y] === this._board.elements.chest)
      return gameStatus.success;
    return gameStatus.failed;
  }

  useTorch() {
    //console.log("use torch");
    // if (this._state.items.torchNum === 0) {
    //   return gameStatus.failed;
    // }
    const nextPos = this.getNextPos();
    //console.log("next pos");
    //console.log(nextPos)
    if (nextPos.x < 0 || nextPos.x >= this._board.size || nextPos.y < 0 || nextPos.y >= this._board.size)
      return gameStatus.failed;
    if (this._board.setTorch(nextPos) === gameStatus.running) {
    //  this._nextState.items.torchNum = this._state.items.torchNum - 1;
      return gameStatus.running;
    }
    else
      return gameStatus.failed;
  }

  useBomb() {
    if (this._state.items.bombNum === 0) {
      return gameStatus.failed;
    }
    const nextPos = this.getNextPos();
    if (nextPos.x < 0 || nextPos.x >= this._board.size || nextPos.y < 0 || nextPos.y >= this._board.size)
      return gameStatus.failed;
    return this._board.setBomb(nextPos, this.dir);
  }
}

export default Character;
