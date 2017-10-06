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
    for (let j = 0; j < this.props.size; j++) {
      const state = i + j == this.props.curPos ? true : false;
      rows.push(<Square
        value={state}
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
      size: 9
    };
  }

  go() {
    if (this.state.dir == 0) 
      this.setState({curPos: this.state.curPos - this.state.size});
    else if (this.state.dir == 1)
      this.setState({curPos: this.state.curPos + 1});
    else if (this.state.dir == 2)
      this.setState({curPos: this.state.curPos + this.state.size})
    else if (this.state.dir == 3)
      this.setState({curPos: this.state.curPos - 1})
  }

  render() {
    let pos = "current position: (" + Math.floor(this.state.curPos / 9) + ', ' + this.state.curPos % 9 + ')';
    let dir = "current dir: " + this.state.dir;
    return (
      <div className="game">
        <div className="game-board">
          <Board
            curPos={this.state.curPos}
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
          <button onClick={() => this.setState({dir: (this.state.dir + 3) % 4})}>
            Turn Left
          </button>
          <button onClick={() => this.setState({dir: (this.state.dir + 1) % 4})}>
            Turn Right
          </button>
        </div>
      </div>
    );
  }
}

export default Game