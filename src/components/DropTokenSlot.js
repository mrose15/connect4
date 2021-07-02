import React from 'react';

export default function DropTokenSlot({ identifier, coordinate, dropper }) {
  switch(identifier) {
    case 1:
      return <div className="droptoken-player1 droptoken-slot"></div>;
    case 2:
      return <div className="droptoken-player2 droptoken-slot"></div>;
    default:
      return <div onClick={()=> dropper(coordinate)} className="droptoken-slot"></div>;
  }
}
