import React from 'react';
import charactor_up from './img/charactor-up.jpg';
import charactor_down from './img/charactor-down.jpg';
import charactor_left from './img/charactor-left.jpg';
import charactor_right from './img/charactor-right.jpg';
import './Game.css'
import { character, mainControl } from '../logic/MainControl';

class Charactor extends React.Component {
  render() {
    let charactor;
    if (this.props.value == 0)
      charactor = charactor_up;
    else if (this.props.value == 1)
      charactor = charactor_right;
    else if (this.props.value == 2)
      charactor = charactor_down;
    else
      charactor = charactor_left;
    return (
      <div>
        <img src={charactor} alt="charactor" className="charactor-pic"/>
      </div>
    )
  }
}

function Square(props) {
  const square = props.pos ? <Charactor value={props.dir}/> : null;
  return (
    <button className="square">
      { square }
    </button>
  );
}

class Board extends React.Component {
  renderSquare = i => Object.keys(Array.from(Array(this.props.size))).map((_, j) => (
    <Square pos={i + j === this.props.curPos} dir={this.props.dir} />
  ))

  render() {
    return (
      <div>
        {Object.keys(Array.from(Array(this.props.size))).map((_, i) => (
          <div className="board-row">
            {this.renderSquare(i * this.props.size)}
          </div>
        ))}
      </div>
    )
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.finished = true;
    
    this.state = {
      curPos: 40,
      dir: 0,
      size: 9,
      curTestStep: 0,
      curStep: 0,
    };
  }

  exec_action_list() {
    if (this.state.curStep >= this.props.actionList.length) {
      this.props.onActionFinish();
      this.setState({acionList: []});
      this.finished = true;
      clearInterval(this.interval);
    }
    else {
      const execId = this.props.actionList[this.state.curStep];
      if (execId == 1)
        this.go();
      else if (execId === 2)
        this.turn_left();
      else if (execId === 3)
        this.turn_right();
    }
  }

  go() {
    character.go();
    this.setState({curStep: this.state.curStep + 1});
  }

  turn_left() {
    character.turnLeft();
    this.setState({curStep: this.state.curStep + 1});
    //this.render();
  }

  turn_right() {
    character.turnRight();
    this.setState({curStep: this.state.curStep + 1});
  }

  init() {
    if (this.finished) {
      this.finished = false;
      this.setState({curStep: 0});
      this.interval = setInterval(() => this.exec_action_list(), 1000);
    }
  }

  render() {
    this.init();
    mainControl.update();
    const pos = "current position: (" + Math.floor(character.pos.x) + ', ' + character.pos.y + ')';
    const dir = "current dir: " + character.dir;
    return (
      <div className="game">
        <div className="game-board">
          <Board
            curPos={character.pos.x*9+character.pos.y}
            dir={character.dir}
            size={this.state.size}
          />
        </div>
        <div className="game-info">
          <div>
            {pos}
            <br/>
            {dir}
          </div>
          <button onClick={() => this.go()}>
            Go
          </button>
          <button onClick={() => this.turn_left()}>
            Turn Left
          </button>
          <button onClick={() => this.turn_right()}>
            Turn Right
          </button>
          <br/>
        </div>
      </div>
    );
  }
}

export default Game