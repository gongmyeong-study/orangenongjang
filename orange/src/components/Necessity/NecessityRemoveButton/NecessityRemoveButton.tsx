import React from 'react';
import { useDispatch } from 'react-redux';
import { removeNecessityPlace } from '../../../store/actions/necessity/necessity';

interface Props {
  placeId: number;
  necesstiyId: number;
}

function NecessityRemoveButton(props: Props) {
  const dispatch = useDispatch();

  const onRemoveNecessityPlace = (placeId: number, necessityId: number) => {
    dispatch(removeNecessityPlace(placeId, necessityId));
  };

  return (
    <i className="far fa-trash-alt fa-lg" style={{ color: 'red' }} onClick={() => onRemoveNecessityPlace(props.placeId, props.necesstiyId)} />
  );
}

export default NecessityRemoveButton;
