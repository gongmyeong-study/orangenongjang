import React from 'react';
import { Button } from '@material-ui/core';
import { Necessity } from '../../../api';

interface Props {
  updateNecessity: (necessity: Necessity) => void;
  necessity: Necessity;
}

function NecessityUpdateButton(props: Props) {
  return (
    <i className="far fa-edit fa-lg" onClick={() => props.updateNecessity(props.necessity)} />
  );
}

export default NecessityUpdateButton;
