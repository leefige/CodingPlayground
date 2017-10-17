class Player {
  _curStep;
  _totalStep;
  _states;
  constructor(state) {
    this._curStep = 0;
    this._totalStep = 0;
    this._states = new Array();
  }

  nextStep() {
    if (this._curStep < this._totalStep - 1)
    this._curStep = this._curStep + 1;
  }

  reset() {
    this._curStep = 0;
  }

  add(state) {
    this._states[this._totalStep] = JSON.parse(JSON.stringify(state)); // 深拷贝
    this._totalStep = this._totalStep + 1;
  }

  load(states) {
    this._states = JSON.parse(JSON.stringify(states)); // 深拷贝
    this._curStep = 0;
    this._totalStep = this._states.length;
  }

  save() {
    return this._states;
  }

  get character() { return this._states[this._curStep].character; }

  get board() { return this._states[this._curStep].board; }
}

export default Player;
