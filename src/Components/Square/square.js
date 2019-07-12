import React from 'react';

/*-------- SQUARE --------*/
export default function Square(props){//Function Component
    return (
      <button className="square" onClick={() => props.onClick()}>
        {props.value}
      </button>
    );
  }