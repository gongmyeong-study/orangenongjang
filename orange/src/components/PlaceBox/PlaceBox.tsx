import React, { useEffect, useState } from 'react';
import EdiText from 'react-editext';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { Necessity, Place } from '../../api';
import { renamePlace } from '../../store/actions/necessity/necessity';
import { OrangeGlobalState } from '../../store/state';
import NecessityList from '../Necessity/NecessityList/NecessityList';
import './PlaceBox.css';
import NecessityCreateOrUpdateForm from '../Necessity/NecessityCreateOrUpdateForm/NecessityCreateOrUpdateForm';
import { necessityStatus } from '../../constants/constants';

interface Props {
  place: Place;
}

function PlaceBox(props: Props) {
  const { place } = props;
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [necessityToBeUpdated, setNecessityToBeUpdated] = useState<Necessity>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPlaceRenamed, setIsPlaceRenamed] = useState(false);
  const [placeToBeRenamed, setPlaceToBeRenamed] = useState(place.name);

  const { createStatus, updateStatus } = useSelector((state: OrangeGlobalState) => state.necessity);

  const updateNecessity = (necessity: Necessity) => {
    setNecessityToBeUpdated(necessity);
    setModalOpen(true);
  };

  const RenamedPlace = (placeName: string) => {
    setPlaceToBeRenamed(placeName);
    setIsPlaceRenamed(true);
  };

  const onRenamePlace = (houseId: number, placeId: number, placeName: string) => {
    dispatch(renamePlace(houseId, placeId, placeName));
    setIsPlaceRenamed(false);
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
        <NecessityCreateOrUpdateForm
          placeId={place.id}
          necessityToBeUpdated={necessityToBeUpdated}
          type={necessityToBeUpdated ? 'UPDATE' : 'CREATE'}
        />
      </Modal>
      <h1>
        <EdiText
          type="text"
          editButtonClassName="far fa-pencil-alt"
          showButtonsOnHover
          submitOnUnfocus
          submitOnEnter
          cancelOnEscape
          inputProps={{
            className: 'text',
            placeholder: 'Place 이름을 입력하세요.',
          }}
          validationMessage="한 글자 이상 입력하세요."
          validation={(val) => val.length > 0}
          value={place.name}
          onSave={RenamedPlace}
        />
      </h1>
      {(isPlaceRenamed)
        ? (onRenamePlace(place.house_id, place.id, placeToBeRenamed))
        : (null)}
      <NecessityList
        place={place}
        updateNecessity={updateNecessity}
        createNecessity={createNecessity}
      />
    </div>
  );
}

export default PlaceBox;
