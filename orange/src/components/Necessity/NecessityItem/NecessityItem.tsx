import React from 'react';
import { Necessity } from '../../../api';
import './NecessityItem.css';

interface Props {
  necessity: Necessity;
}

function NecessityItem(props: Props) {
  let necessityname = props.necessity.name;
  if (necessityname.length > 10) {
    necessityname = `${necessityname?.substring(0, 9)}...`;
  }
  return (
    <div className="necessity">
      <h4>{necessityname}</h4>
    </div>
  );
}

export default NecessityItem;
