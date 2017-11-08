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
  _callback;
  _gameOverCallback;
  _mode;

  constructor(initState) {
    this._curStep = 0;
    this._totalStep = 0;
    this._states = [initState];
    this._result = playerStatus.failed;
    this._status = playerStatus.init;
    this._nextStatus = playerStatus.pause;
    this._callback = undefined;
    this._gameOverCallback = undefined;
    this._mode = 'normal';
  }

  // set callback function for step through mode
  setCallback(callback) {
    this._callback = callback;
  }

  // set callback function for game over
  setGameOverCallback (callback) {
    this._gameOverCallback = callback;
  }

  // set status after init: directly run or pause
  setNextStatus(nextStatus) {
    this._nextStatus = nextStatus;
  }

  // Set Step through mode or Normal mode
  setMode(mode) {
    this._mode = mode;
  }

  getMode() {
    return this._mode;
  }

  nextStep() {
    //console.log(this.enemy);
    
    // console.log(this._mode);
    // console.log("status")
    // console.log(this._status);
    // console.log("curStep")
    // console.log(this._curStep);
    // console.log(this._totalStep);
    if (this._status === playerStatus.init)
      this._status = this._nextStatus;
    
    if (this._status === playerStatus.running) {
      if (this._curStep < this._totalStep)
        this._curStep = this._curStep + 1;
      else if (this._mode == 'step') {
        this._callback();
        this.status = playerStatus.pause;
      }
      else { // player end
        this._gameOverCallback();
        this._status = this._result;
      }
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
    this._mode = 'end'; // force end for step-mode
  }

  get enemy() {
    return this._states[this._curStep].enemy;
  }
  get character() {
    return this._states[this._curStep].character;
  }

  get board() {
    return this._states[this._curStep].board;
  }
}

export default Player;
export { playerStatus };