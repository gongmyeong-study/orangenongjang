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

      <section className="necessity-list">
        { place.necessities.length
          ? place.necessities.map((necessity: Necessity) => (
            <div className="necessity-wrapper">
              <NecessityItem necessity={necessity} />
            </div>
          ))
          : (
            <h2>
              {place.name}
              에
              첫 생필품을 추가해보세요!
            </h2>
          )}
        <div className="necessity-wrapper">
          <i className="fas fa-plus" onClick={() => setModalOpen(true)} />
        </div>
      </section>
    </>
  );
}

export default NecessityList;
