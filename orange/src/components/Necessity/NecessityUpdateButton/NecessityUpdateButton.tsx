import React from 'react';
import { Button } from '@material-ui/core';
import { Necessity } from '../../../api';

interface Props {
  updateNecessity: (necessity: Necessity) => void;
  necessity: Necessity;
}

function NecessityUpdateButton(props: Props) {
  return (
    <Button onClick={() => props.updateNecessity(props.necessity)}>
      <i className="far fa-edit" />
    </Button>
  );
}

export default NecessityUpdateButton;
