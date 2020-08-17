import React from 'react';
import './NecessityTemplate.css';

interface Props {
  children: any;
}

function NecessityTemplate({ children }: Props) {
  return (
    <div
      className="necessity-template-block"
    >
      {children}
    </div>
  );
}

export default NecessityTemplate;
