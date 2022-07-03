import './new.css';
import { useState } from 'react';

function App() {

   const [winner, setWinner] = useState('');
   const [cells, setCells] = useState(Array(9).fill(''));
   const [theCell, setTheCell] = useState(Array(9).fill('normal'));

   let signs = {
      horizontal: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
      vertical: [[0, 3, 6], [1, 4, 7], [2, 5, 8]],
      diagonal: [[0, 4, 8], [2, 4, 6]]
   };

   const checkForWinner = (squares) => {
		for (let sign in signs) {
			signs[sign].forEach((item) => {
				if (
					squares[item[0]] === '' || squares[item[1]] === '' || squares[item[2]] === ''
				) {
				} else if (
					squares[item[0]] === squares[item[1]] && squares[item[1]] === squares[item[2]]
				) {
					setWinner(squares[item[0]]);
				}
			});
		}
	};
	let sqrs = [...theCell];
	const handleClick = (num) => {
		if (winner === ''){
			let squares = [...cells];
			if (cells[num] === '') {
				squares[num] = 'x';
				sqrs[num] = 'normal' + ' xli';
			} else if (cells[num] === 'x') {
				squares[num] = 'o';
				sqrs[num] = 'normal' + ' olu';
			} else {
				squares[num] = '';
				sqrs[num] = 'normal';
			}
			for (let sign in signs) {
				signs[sign].forEach((item) => {
					if (
						sqrs[item[0]] === 'normal' || sqrs[item[1]] === 'normal' || sqrs[item[2]] === 'normal'
					) {
					} else if (
						sqrs[item[0]] === sqrs[item[1]] && sqrs[item[1]] === sqrs[item[2]] && squares[item[0]] === 'x'
					) {
						sqrs[item[0]] = 'normal' + ' xli' + ' winnerx';
						sqrs[item[1]] = 'normal' + ' xli' + ' winnerx';
						sqrs[item[2]] = 'normal' + ' xli' + ' winnerx';
					} else if (
						sqrs[item[0]] === sqrs[item[1]] && 
						sqrs[item[1]] === sqrs[item[2]] &&
						squares[item[0]] === 'o'
					) {
						sqrs[item[0]] = 'normal' + ' olu' + ' winnero';
						sqrs[item[1]] = 'normal' + ' olu' + ' winnero';
						sqrs[item[2]] = 'normal' + ' olu' + ' winnero';
					}
				});
			}
			checkForWinner(squares);
			setCells(squares);	
			setTheCell(sqrs);	
		} else {
				setWinner('');
				setCells(Array(9).fill(''));
				setTheCell(Array(9).fill('normal'));
		}
	};
  
  return (
    <div class="container">
        <p class="gametxt">GAME TIME</p>
        <div class="boxes noSelect">
          <div className={theCell[0]} onClick={() => handleClick(0)}>{cells[0]}</div>
          <div className={theCell[1]} onClick={() => handleClick(1)}>{cells[1]}</div>
          <div className={theCell[2]} onClick={() => handleClick(2)}>{cells[2]}</div>
          <div className={theCell[3]} onClick={() => handleClick(3)}>{cells[3]}</div>
          <div className={theCell[4]} onClick={() => handleClick(4)}>{cells[4]}</div>
          <div className={theCell[5]} onClick={() => handleClick(5)}>{cells[5]}</div>
          <div className={theCell[6]} onClick={() => handleClick(6)}>{cells[6]}</div>
          <div className={theCell[7]} onClick={() => handleClick(7)}>{cells[7]}</div>
          <div className={theCell[8]} onClick={() => handleClick(8)}>{cells[8]}</div>
        </div>		
    </div>
  );
}

export default App;
