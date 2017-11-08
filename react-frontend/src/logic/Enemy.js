import Unit from "./Unit"
// 方向: up:0, right:1, down:2, left:3 
class Enemy extends Unit {
  _board;
  constructor(state) {
    super(state)
  }

  go() {
    if (this._state.status == 'alive') {
      let nextPos = this.getNextPos();
      console.log(nextPos)
      this._nextState.pos = nextPos;
      for (let i = 0; i < this._state.turningPoint.length; i++) {
        if (nextPos.x == this._state.turningPoint[i].pos.x && nextPos.y == this._state.turningPoint[i].pos.y) {
          this._nextState.dir = this._state.turningPoint[i].dir;
          break;
        }
      }
    }
  }

  killed() {
    this._nextState.status = 'dead';
  }

}

export default Enemy;