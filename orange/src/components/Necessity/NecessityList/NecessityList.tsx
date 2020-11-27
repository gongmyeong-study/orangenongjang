import React, { useState } from 'react';
import './NecessityList.css';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { Button } from '@material-ui/core';
import { Necessity, Place } from '../../../api';
import NecessityItem from '../NecessityItem/NecessityItem';
import NecessityCounter from '../NecessityCounter/NecessityCounter';
import NecessityCreateOrUpdateForm from '../NecessityCreateOrUpdateForm/NecessityCreateOrUpdateForm';
import { createNecessityPlace, updateNecessityPlace } from '../../../store/actions/necessity/necessity';

interface Props {
  place: Place;
}

function NecessityList(props: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [necessityToBeUpdated, setNecessityToBeUpdated] = useState<Necessity>();

  const { place } = props;

  const updateNecessity = (necessity: Necessity) => {
    setNecessityToBeUpdated(necessity);
    setModalOpen(true);
  };

  const closeModal = () => {
    setNecessityToBeUpdated(undefined);
    setModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="create-modal"
        overlayClassName="create-modal-overlay"
      >
        <NecessityCreateOrUpdateForm placeId={place.id} necessityToBeUpdated={necessityToBeUpdated} type={necessityToBeUpdated ? 'UPDATE' : 'CREATE'} />
      </Modal>

      <section className="necessity-list">
        { place.necessities.length
          ? place.necessities.map((necessity: Necessity) => (
            <div className="necessity-wrapper">
              <NecessityItem necessity={necessity} />
              <Button onClick={() => updateNecessity(necessity)}><i className="far fa-edit" /></Button>
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
