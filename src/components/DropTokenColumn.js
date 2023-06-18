import React from 'react';

export default function DropTokenColumn({ column }) {
  return (
    <div className="droptoken-column" key={column}>
      {column}
    </div>
  );
}
