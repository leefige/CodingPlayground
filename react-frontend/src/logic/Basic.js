class Basic {
  _state;
  _nextState;
  _mainControl;
  constructor(state, mainControl) {
    this._state = state;
    this._nextState = state;
    this._mainControl = mainControl;
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
