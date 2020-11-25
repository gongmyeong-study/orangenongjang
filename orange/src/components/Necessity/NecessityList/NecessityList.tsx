import React, { useState } from 'react';
import './NecessityList.css';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { Necessity, Place } from '../../../api';
import NecessityItem from '../NecessityItem/NecessityItem';
import NecessityCounter from '../NecessityCounter/NecessityCounter';
import NecessityCreate from '../NecessityCreate/NecessityCreate';
import { createNecessityPlace } from '../../../store/actions/necessity/necessity';

interface Props {
  place: Place;
}

function NecessityList(props: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Example Modal"
      >
        <NecessityCreate onCreateNecessityPlace={onCreateNecessityPlace} placeId={place.id} />
      </Modal>

      <button type="button" onClick={() => setModalOpen(true)}>만들기</button>
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
