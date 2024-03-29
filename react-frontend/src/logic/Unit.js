import Basic from "./Basic"
// 方向: up:0, right:1, down:2, left:3 
class Unit extends Basic {
  getNextPos() {
    return this.getNextPosBasic(this.pos, this.dir);
  }

  getNextPosBasic(pos, dir) {
    let nextPos = pos;
    if (dir === 0)
      nextPos = { x : pos.x - 1, y : pos.y };
    else if (dir === 1)
      nextPos = { x : pos.x, y : pos.y + 1};
    else if (dir === 2)
      nextPos = { x : pos.x + 1, y : pos.y};
    else if (dir === 3)
      nextPos = { x : pos.x, y : pos.y - 1};
    return nextPos;
  }

  get pos() { return this._state.pos; }
  get dir() { return this._state.dir; }
}

export default Unit;