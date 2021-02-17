import React from 'react';
import { Necessity } from '../../../api';

interface Props {
  updateNecessity: (necessity: Necessity) => void;
  necessity: Necessity;
}

function NecessityUpdateButton(props: Props) {
  return (
    <i
      className="far fa-edit fa-lg"
      style={{ cursor: 'pointer' }}
      onClick={() => props.updateNecessity(props.necessity)}
    />
  );
}

export default NecessityUpdateButton;
