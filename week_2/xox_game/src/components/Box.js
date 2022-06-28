import React from 'react';
import { useState, useEffect } from 'react';

function Box(props) {

  const [sign, setSign] = useState('')

  function togglePlayer() {
    if(sign === '') {
      setSign(props.currentState);
      props.changeTurn(props.row, props.col);
    } 
  } 

 //style={{backgroundColor: props.bg, color: props.color}}
  return <div onClick={togglePlayer}>{sign}</div>

}

export default Box;