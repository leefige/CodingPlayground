import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import charactor from './charactor.jpg';
import './Game.css'

class Charactor extends React.Component {
  render() {
    return (
      <div>
        <img src={charactor} className="charactor-pic"/>
      </div>
    )
  }
}

function Square(props) {
  const square = props.value ? <Charactor /> : null;
  return (
    <button className="square">
      { square }
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    var rows = [];
    for (let j = 0; j < 9; j++) {
      const state = i + j == this.props.curPos ? true : false;
      rows.push(<Square
        value={state}
        />);
    }
    return rows;
  }

  render() {
    var cols = [];
    for (let i = 0; i < 9; i++)
      cols.push(<div className="board-row">
        {this.renderSquare(i*9)}
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
      dir: 0
    };
  }

  go() {
    this.setState({curPos: this.state.curPos - 9})
  }

  render() {
    let status = "current position: (" + Math.floor(this.state.curPos / 9) + ', ' + this.state.curPos % 9 + ')';
    return (
      <div className="game">
        <div className="game-board">
          <Board
            curPos={this.state.curPos}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.go()}>
            Go
          </button>
          <button>
            Turn Left
          </button>
          <button>
            Turn Right
          </button>
        </div>
      </div>
    );
  }
}

export default Game