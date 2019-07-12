import React from 'react';
import Board from '../Board/board'

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

/*-------- GAME --------*/
export default class Game extends React.Component {
    constructor(props){
      super(props);
      this.state ={
        history: [{
          squares : Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      };
    }
    
    //Storing the state in the GAME component instead of the individual Square components
    handleClick(i){//Handle click function
      const history = this.state.history.slice(0, this.state.stepNumber +1);
      const current = history[this.state.stepNumber];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {//Ignore a click if s.o has won the game.
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history:history.concat([{//Concat method doesn't mutate the original array . Which better than push() method.
          squares:squares,
          lastMovePosition:i
        }]),
        stepNumber : history.length,
        xIsNext: !this.state.xIsNext,//Flip the xIsNext boolean.
      });
    }

    jumpTo(step){
      this.setState({
        stepNumber:step,
        xIsNext: (step % 2) === 0,//xIsNext is true if "step" is even
      })
    }


    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      
      const moves = history.map((step, move) => {
        const lastMovePosition = step.lastMovePosition;
        const col = 1 + Math.floor(lastMovePosition/3);
        const row = 1 + lastMovePosition%3;
        const desc = move ?
          'Go to move #' + move + "(Col:"+col+",Row:"+row+")":
          'Go to game start';
        return (
          //Move is an unique ID 
          <li key={move}> 
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
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