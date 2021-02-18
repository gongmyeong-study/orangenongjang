import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { countNecessityPlace } from '../../../store/actions/necessity/necessity';

type CountType = 'add' | 'subtract';

interface Props {
  placeId: number;
  necessityId: number;
  count: number;
  countType: CountType;
}

function NecessityCounterButton(props: Props) {
  const dispatch = useDispatch();

  const onCountNecessityPlace = (placeId: number, necessityId: number, count: number) => {
    dispatch(countNecessityPlace(placeId, necessityId, count));
  };

  const addCount = () => {
    onCountNecessityPlace(props.placeId, props.necessityId, props.count + 1);
  };

  const subtractCount = () => {
    onCountNecessityPlace(props.placeId, props.necessityId, props.count - 1);
  };

  return (
    <Button
      onClick={props.countType === 'add' ? addCount : subtractCount}
      disabled={props.countType === 'subtract' && props.count === 0}
    >
      <i className={`far ${props.countType === 'add' ? 'fa-plus-square' : 'fa-minus-square'} fa-2x`} />
    </Button>
  );
}

export default NecessityCounterButton;
