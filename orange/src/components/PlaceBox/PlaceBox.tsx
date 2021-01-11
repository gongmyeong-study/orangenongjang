import React, { useEffect, useState } from 'react';
import EdiText from 'react-editext';
import {
  useSelector,
} from 'react-redux';
import Modal from 'react-modal';
import { Necessity, Place } from '../../api';
import { OrangeGlobalState } from '../../store/state';
import NecessityList from '../Necessity/NecessityList/NecessityList';
import './PlaceBox.css';
import NecessityCreateOrUpdateForm from '../Necessity/NecessityCreateOrUpdateForm/NecessityCreateOrUpdateForm';
import { necessityStatus } from '../../constants/constants';

interface Props {
  place: Place;
}

function PlaceBox(props: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [necessityToBeUpdated, setNecessityToBeUpdated] = useState<Necessity>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [placeToBeRenamed, setPlaceToBeRenamed] = useState<Place>();

  const { createStatus, updateStatus } = useSelector((state: OrangeGlobalState) => state.necessity);

  const { place } = props;

  const updateNecessity = (necessity: Necessity) => {
    setNecessityToBeUpdated(necessity);
    setModalOpen(true);
  };

  const renamePlace = (placeName: Place) => {
    setPlaceToBeRenamed(placeName);
  };

  const createNecessity = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setNecessityToBeUpdated(undefined);
    setModalOpen(false);
  };

  useEffect(() => {
    Modal.setAppElement('body');

    if (createStatus === necessityStatus.SUCCESS) {
      closeModal();
    } if (createStatus === necessityStatus.FAILURE) {
      alert(`생필품 생성에 실패했어요ㅠㅠ \n 에러 메시지 : ${createStatus}`);
    }
    if (updateStatus === necessityStatus.SUCCESS) {
      closeModal();
    } if (updateStatus === necessityStatus.FAILURE) {
      alert(`생필품 수정에 실패했어요ㅠㅠ\n 에러 메시지 : ${updateStatus}`);
    }
  }, [createStatus, updateStatus]);

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
        <NecessityCreateOrUpdateForm placeId={place.id} necessityToBeUpdated={necessityToBeUpdated} type={necessityToBeUpdated ? 'UPDATE' : 'CREATE'} />
      </Modal>
      <h1>
        <EdiText
          type="text"
          value={place.name}
          onSave={renamePlace}
        />
      </h1>
      <NecessityList
        place={place}
        updateNecessity={updateNecessity}
        createNecessity={createNecessity}
      />
    </div>
  );
}

export default PlaceBox;
