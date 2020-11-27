import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { removeNecessityPlace } from '../../../store/actions/necessity/necessity';

interface Props {
  placeId: number;
  necesstiyId: number;
}

function NecessityRemoveButton(props: Props) {
  const dispatch = useDispatch();

  const onRemoveNecessityPlace = (placeId: number, necessityId: number) => {
    dispatch(removeNecessityPlace(placeId, necessityId));
  }


  return (
    <Button onClick={() => onRemoveNecessityPlace(props.placeId, props.necesstiyId) }>
      <i className="far fa-trash-alt" style={{color: 'red'}}></i>
    </Button>
  )
}

export default NecessityRemoveButton;
