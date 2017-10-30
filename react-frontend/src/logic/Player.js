class Player {
  _curStep;
  _totalStep;
  _states;
  _result;
  constructor() {
    this._curStep = 0;
    this._totalStep = 0;
    this._states = [];
    this._result = 0;
  }

  nextStep() {
    if (this._curStep < this._totalStep)
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

  isPlaying() {
    return this._curStep < this._totalStep;
  }

  getStatus() {
    if (this._curStep < this._totalStep) // 正常运行
      return 1;
    if (this._curStep === 0) // 初始状态
      return 0;
    return this._result; // 游戏结束
  }

  setResult(result) {
    this._result = result;
  }

  get character() {
    if (this.isPlaying() === false) // 防止数组越界
      return this._states[this._totalStep - 1].character;
    return this._states[this._curStep].character; }

  get board() {
    if (this.isPlaying() === false) // 防止数组越界
      return this._states[this._totalStep - 1].board;
    return this._states[this._curStep].board;
  }
}

export default Player;
