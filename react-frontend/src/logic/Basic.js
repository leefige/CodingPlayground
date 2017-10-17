class Basic {
  _state;
  _nextState;
  constructor(state) {
    this._state = state;
    this._nextState = state;
  }

  update() {
    this._state = this._nextState;
  }

  load(state) {
    this._state = state;
    this._nextState = state;
  }

  get state() {
    return this._state;
  }
}

export default Basic;