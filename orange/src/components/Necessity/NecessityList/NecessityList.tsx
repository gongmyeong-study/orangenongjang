import React, { useState } from 'react';
import './NecessityList.css';
import { useDispatch } from 'react-redux';
import { Necessity, Place } from '../../../api';
import NecessityItem from '../NecessityItem/NecessityItem';
import NecessityCounter from '../NecessityCounter/NecessityCounter';
import NecessityCreateModal from '../NecessityCreateModal/NecessityCreateModal';
import { createNecessityPlace } from '../../../store/actions/necessity/necessity';

interface Props {
  place: Place;
}

function NecessityList(props: Props) {
  const dispatch = useDispatch();
  const { place } = props;

  const onCreateNecessityPlace = (
    placeId: number,
    name: string,
    option: string,
    description: string,
    price: number,
    count: number,
  ) => {
    dispatch(createNecessityPlace(placeId, name, option, description, price, count));
  };

  return (
    <>
      <NecessityCreateModal onCreateNecessityPlace={onCreateNecessityPlace} placeId={place.id} />
      { place.necessities.length
        ? place.necessities.map((necessity: Necessity) => <NecessityItem necessity={necessity} />)
        : (
          <h2>
            {place.name}
            에
            첫 생필품을 추가해보세요!
          </h2>
        )}
    </>
  );
}

export default NecessityList;
