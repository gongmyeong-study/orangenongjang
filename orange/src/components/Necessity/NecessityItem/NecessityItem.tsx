import React from 'react';
import { Necessity } from '../../../api';

interface Props {
  necessity: Necessity;
}

function NecessityItem(props: Props) {
  return (
    <h1>{props.necessity.name}</h1>
  );
}

export default NecessityItem;
