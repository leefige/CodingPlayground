import Basic from "./Basic"
// 方向: up:0, right:1, down:2, left:3 
class Unit extends Basic {
  constructor(state) {
    super(state);
  }
  pos() {
    return this._state.pos;
  }
  dir() {
    return this._state.dir;
  }
}

export default Unit;