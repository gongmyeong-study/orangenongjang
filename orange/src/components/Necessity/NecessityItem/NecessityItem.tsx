import React from 'react';
import { Necessity } from '../../../api';
import './NecessityItem.css';

interface Props {
  necessity: Necessity;
}

function NecessityItem(props: Props) {
  return (
    <div className="necessity">
      <h4>{props.necessity.name}</h4>
    </div>
  );
}

export default NecessityItem;
