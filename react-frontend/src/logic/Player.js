const playerStatus = {
  init : 0,
  running : 1, 
  success : 2,
  failed : 3,
  pause : 4,
}
class Player {
  _curStep;
  _totalStep;
  _states;
  _result;
  _status;//0 初始，1运行，2胜利，3失败，4暂停
  _nextStatus;
  constructor(initState) {
    this._curStep = 0;
    this._totalStep = 0;
    this._states = [initState];
    this._result = playerStatus.failed;
    this._status = playerStatus.init;
    this._nextStatus = playerStatus.pause;
  }

  setNextStatus(nextStatus) {
    this._nextStatus = nextStatus;
  }

  nextStep() {
    if (this._status === playerStatus.init)
      this._status = this._nextStatus;
    if (this._status === playerStatus.running) {
      if (this._curStep < this._totalStep)
        this._curStep = this._curStep + 1;
      else
        this._status = this._result;
    }
  }

  reset() {
    this._curStep = 0;
  }



  add(state) {
    this._totalStep = this._totalStep + 1;    
    this._states[this._totalStep] = JSON.parse(JSON.stringify(state)); // 深拷贝
  }

  run() {
    this._status = playerStatus.running;
  }

  start() {
    this._status = playerStatus.init;
  }

  pause() {
    this._status = playerStatus.pause;
  }
  
  setStatus(status) {
    this._status = status;
  }

  getStatus() {
    // console.log("current step");
    // console.log(this._curStep);
    // console.log(this._totalStep);
    // console.log(this._result)
    // console.log("status");
    // console.log(this._status);
    return this._status;
  }

  setResult(result) {
    this._result = result;
  }

  get character() {
    //console.log("current step");
    //console.log(this._curStep);
    //console.log(this._totalStep);
    //console.log(this._result)
    if (this.getStatus() > 1) // 防止数组越界
      return this._states[this._totalStep - 1].character;
    return this._states[this._curStep].character; }

  get board() {
    if (this.isPlaying() === false) // 防止数组越界
      return this._states[this._totalStep - 1].board;
    return this._states[this._curStep].board;
  }
}

export default Player;
export { playerStatus };