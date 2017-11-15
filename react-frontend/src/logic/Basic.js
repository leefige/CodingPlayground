class Basic {
  _state;
  _nextState;
  _mainControl;
  constructor(state, mainControl) {
    this._state = state; // shallow copy, auto change value maincontrol state
    this._nextState = JSON.parse(JSON.stringify(state));
    this._mainControl = mainControl;
  }

  update() {
    for (let key in this._nextState)
      this._state[key] = JSON.parse(JSON.stringify(this._nextState[key]));

  }

  load(state) {
    this._state = JSON.parse(JSON.stringify(state));
    this._nextState = JSON.parse(JSON.stringify(state));
  }

  get state() {
    return this._state;
  }
}

export default Basic;
