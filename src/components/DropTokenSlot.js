import React from 'react';

export default function DropTokenSlot({ identifier, coordinate, dropper }) {
  if (identifier === 1 || identifier === 2) {
    const className = `droptoken-player${identifier} droptoken-slot`;
    return <div className={className}></div>;
  }
  return <div onClick={() => dropper(coordinate)} className="droptoken-slot"></div>;
}
