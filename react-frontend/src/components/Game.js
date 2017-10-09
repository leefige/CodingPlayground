import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import charactor_up from './img/charactor-up.jpg';
import charactor_down from './img/charactor-down.jpg';
import charactor_left from './img/charactor-left.jpg';
import charactor_right from './img/charactor-right.jpg';
import './Game.css'

class Charactor extends React.Component {
  render() {
    let charactor;
    if (this.props.value == 0) charactor = charactor_up;
    else if (this.props.value == 1) charactor = charactor_right;
    else if (this.props.value == 2) charactor = charactor_down;
    else charactor = charactor_left;
    return (
      <div>
        <img src={charactor} className="charactor-pic"/>
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
  renderSquare(i) {
    var rows = [];
    for (let j = 0; j < this.props.size; j++) {
      const pos = i + j == this.props.curPos ? true : false;
      rows.push(<Square
        pos={pos}
        dir={this.props.dir}
        />);
    }
    return rows;
  }

  render() {
    var cols = [];
    for (let i = 0; i < this.props.size; i++)
      cols.push(<div className="board-row">
        {this.renderSquare(i * this.props.size)}
        </div>);
    return (
      <div>
        {cols}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    
    this.state = {
      curPos: 40,
      dir: 0,
      size: 9,
      curStep: 0
    };
  }

  tick() {
    this.go();
  }

  go() {
    console.log(this.props.actionList)
    if (this.state.dir == 0) 
      this.setState({curPos: this.state.curPos - this.state.size});
    else if (this.state.dir == 1)
      this.setState({curPos: this.state.curPos + 1});
    else if (this.state.dir == 2)
      this.setState({curPos: this.state.curPos + this.state.size})
    else if (this.state.dir == 3)
      this.setState({curPos: this.state.curPos - 1})
  }

  turn_left() {
    this.setState({dir: (this.state.dir + 3) % 4})
  }

  turn_right() {
    this.setState({dir: (this.state.dir + 1) % 4})
  }

  test() {
    this.setState({curStep: (this.state.curStep + 1) % 8});
    console.log(this.state.curStep);
    if (this.state.curStep % 2 == 0)
      this.go();
    else
      this.turn_left();
  }

  render() {
    let pos = "current position: (" + Math.floor(this.state.curPos / 9) + ', ' + this.state.curPos % 9 + ')';
    let dir = "current dir: " + this.state.dir;
    return (
      <div className="game">
        <div className="game-board">
          <Board
            curPos={this.state.curPos}
            dir={this.state.dir}
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
          <button onClick={() => this.interval = setInterval(() => this.test(), 1000)}>
            Test
          </button>
          <button onClick={() => clearInterval(this.interval)}>
            Stop
          </button>
        </div>
      </div>
    );
  }
}

export default Game