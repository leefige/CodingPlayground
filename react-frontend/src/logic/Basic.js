class Basic {
  constructor(state) {
    this._state = state;
    this._nextState = state;
  }

  update() {
    this._state = this._nextState;
  }
}

export default Basic;