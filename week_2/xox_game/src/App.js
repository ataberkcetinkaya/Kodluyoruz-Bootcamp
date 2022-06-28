import './App.css';
import { useState, useEffect } from 'react';
import Box from './components/Box';

const board = [[], [], []];

function App() {

   const [turn, setTurn] = useState('X');
   const [winner, setWinner] = useState('');

   function changeTurn(row, col) {
     setTurn(turn === 'X' ? 'O' : 'X');

     board[row][col] = turn;
     let w = checkForWinner();

     if(!w) {

     } else {
      setWinner(w + ' WON!');
     }
    }

    function checkForWinner() {
      //check winner f rows
      for(let i = 0; i < board.length; i++) {
        const row = board[i];

        if(row[0] === row[1] && row[1] === row[2] && row[0]) {
          return row[0];
        }
    }

      //check winner f columns
      for(let i = 0; i < board.length; i++) {
        const cl0 = board[0][i];
        const cl1 = board[1][i];
        const cl2 = board[2][i];
      
        if(cl0 === cl1 && cl1 === cl2 && cl0) {
          return cl0;
        }
      }

      //check winner f diagonals
      const r0 = board[0][0];
      const r1 = board[1][1];
      const r2 = board[2][2];

      if(r0 === r1 && r1 === r2 && r0) {
        return r0;
      }

      const l0 = board[0][2];
      const l1 = board[1][1];
      const l2 = board[2][0];

      if(l0 === l1 && l1 === l2 && l0) {
        return l0;
      }

      return false;

    }

  return (
    <div class="container">
    <h3 class="gameText">
      
      GAME TIME
     
      
      <div id="wnnr">{winner}</div>

      <div id="change" class="bla noSelect">
         <Box row={0} col={0} currentState={turn} changeTurn={changeTurn} />
         <Box row={0} col={1} currentState={turn} changeTurn={changeTurn} />
         <Box row={0} col={2} currentState={turn} changeTurn={changeTurn} />
         <Box row={1} col={0} currentState={turn} changeTurn={changeTurn} />
         <Box row={1} col={1} currentState={turn} changeTurn={changeTurn} />
         <Box row={1} col={2} currentState={turn} changeTurn={changeTurn} />
         <Box row={2} col={0} currentState={turn} changeTurn={changeTurn} />
         <Box row={2} col={1} currentState={turn} changeTurn={changeTurn} />
         <Box row={2} col={2} currentState={turn} changeTurn={changeTurn} />
         
          
      </div> 
      </h3>
      </div>
  );
}

export default App;
