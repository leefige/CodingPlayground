import Unit from "./Unit"
// 方向: up:0, right:1, down:2, left:3 
class Enemy extends Unit {
  _board;
  constructor(state) {
    super(state)
  }

  go() {
    if (this._state.status === 'alive') {
      for (let i = 0; i < this._state.turningPoint.length; i++) {
        if (this.pos.x === this._state.turningPoint[i].pos.x && this.pos.y === this._state.turningPoint[i].pos.y) {
          this._nextState.dir = this._state.turningPoint[i].dir;
          break;
        }
      }
      let nextPos = this.getNextPosBasic(this.pos, this._nextState.dir);
      this._nextState.pos = nextPos;
    }
  }

  killed() {
    this._nextState.status = 'dead';
  }

  get status() { return this._state.status; }

}

export default Enemy;