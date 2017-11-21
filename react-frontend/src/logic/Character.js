import Unit from "./Unit"
import { gameStatus, elements, direction } from "./Constant"


// 方向: up:0, right:1, down:2, left:3
class Character extends Unit {

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
    const board = this._mainControl.board;
    let nextPos = this.getNextPos();
    if (nextPos.x < 0 || nextPos.x >= board.size || nextPos.y < 0 || nextPos.y >= board.size)
      return gameStatus.failed;
    if (board.map[nextPos.x][nextPos.y] !== elements.empty)
      return gameStatus.failed;
    this._nextState.pos = nextPos;
    return gameStatus.running;
  }

  // attack the enemy in front of character
  attack() {
    let attackPos = this.getNextPos();
    const enemy = this._mainControl.enemy;
    for (let i = 0; i < enemy.length; i++) {
      if (attackPos.x === enemy[i].pos.x && attackPos.y === enemy[i].pos.y && enemy[i].status === 'alive')
        enemy[i].killed();
    }
    return gameStatus.running;
  }

  // open the treasure in front of character
  open() {
    const board = this._mainControl.board;
    const nextPos = this.getNextPos();
    if (nextPos.x < 0 || nextPos.x >= board.size || nextPos.y < 0 || nextPos.y >= board.size)
      return gameStatus.failed;
    if (board.map[nextPos.x][nextPos.y] === elements.chest)
      return gameStatus.success;
    return gameStatus.failed;
  }

  useTorch() {
    if (this._state.items.torchNum === 0)
      return gameStatus.failed;
    this._nextState.items.torchNum = this._state.items.torchNum - 1;
    const nextPos = this.getNextPos();
    const board = this._mainControl.board;
    return board.setTorch(nextPos);
  }

  useBomb() {
    if (this._state.items.bombNum === 0)
      return gameStatus.failed;
    this._nextState.items.bombNum = this._state.items.bombNum - 1;
    const nextPos = this.getNextPos();
    const board = this._mainControl.board;
    return board.setBomb(nextPos, this.dir);
  }

  frontIs(elementId) {
    const nextPos = this.getNextPos();
    const board = this._mainControl.board;
    return (board.map[nextPos.x][nextPos.y] === elementId);
  }
}

export default Character;
