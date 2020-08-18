import React from 'react';
import './NecessityHead.css';

function NecessityHead() {
  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

  return (
    <div
      className="NecessityHeadBlock"
    >
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
    </div>
  );
}

export default NecessityHead;
