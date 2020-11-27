import React, { useState } from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Necessity, Place } from '../../../api';
import { OrangeGlobalState } from '../../../store/state';
import NecessityList from '../NecessityList/NecessityList';
import './PlaceBox.css';
import NecessityCreateOrUpdateForm from '../NecessityCreateOrUpdateForm/NecessityCreateOrUpdateForm';

interface Props {
  history: History;
  places: Place[];
}

function PlaceBox(props: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [necessityToBeUpdated, setNecessityToBeUpdated] = useState<Necessity>();

  const updateNecessity = (necessity: Necessity) => {
    setNecessityToBeUpdated(necessity);
    setModalOpen(true);
  };

  const createNecessity = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setNecessityToBeUpdated(undefined);
    setModalOpen(false);
  };

  const place = props.places[0];

  return (
    <div
      className="PlaceBox"
    >
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="create-modal"
        overlayClassName="create-modal-overlay"
      >
        {Boolean(place)
        && <NecessityCreateOrUpdateForm placeId={place.id} necessityToBeUpdated={necessityToBeUpdated} type={necessityToBeUpdated ? 'UPDATE' : 'CREATE'} />}
      </Modal>
      <h1>{Boolean(place) && place.name}</h1>
      {Boolean(place) && (
      <NecessityList
        place={place}
        updateNecessity={updateNecessity}
        createNecessity={createNecessity}
      />
      )}
    </div>
  );
}

const mapStateToProps = (state: OrangeGlobalState) => ({
  places: state.necessity.places,
});

export default connect(mapStateToProps)(PlaceBox);
