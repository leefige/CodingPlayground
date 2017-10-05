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
  return (
    <button className="square" onClick={props.onClick}>
      <Charactor />
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    var rows = [];
    for (let j = 0; j < 9; j++)
      rows.push(<Square
        value={this.props.squares[i+j]}
        onClick={() => this.props.onClick(i+j)}
        />);
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
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Move #" + move : "Game start";
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game