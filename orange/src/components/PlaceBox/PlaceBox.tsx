import React, { useEffect, useState } from 'react';
import EdiText from 'react-editext';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';

import {
  Necessity, Place, House, User,
} from '../../api';
import { necessityStatus } from '../../constants/constants';
import NecessityList from '../Necessity/NecessityList/NecessityList';
import NecessityCreateOrUpdateForm from '../Necessity/NecessityCreateOrUpdateForm/NecessityCreateOrUpdateForm';
import {
  houseActions,
  necessityActions,
  userActions,
} from '../../store/actions/index';
import { OrangeGlobalState } from '../../store/state';
import './PlaceBox.css';

interface Props {
  place: Place;
  myHouse?: House;
  me?: User;
}

function PlaceBox(props: Props) {
  const { place } = props;
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [necessityToBeUpdated, setNecessityToBeUpdated] = useState<Necessity>();
  const { getHouseStatus, house } = useSelector(
    (state: OrangeGlobalState) => state.house,
  );
  const { getMeStatus, me } = useSelector(
    (state: OrangeGlobalState) => state.user,
  );
  const { createStatus, updateStatus } = useSelector(
    (state: OrangeGlobalState) => state.necessity,
  );

  const updateNecessity = (necessity: Necessity) => {
    setNecessityToBeUpdated(necessity);
    setModalOpen(true);
  };

  const onRenamePlace = (
    houseId: number,
    placeId: number,
    placeName: string,
  ) => {
    dispatch(necessityActions.renamePlace(houseId, placeId, placeName));
  };

  const savePlace = (placeName: string) => {
    onRenamePlace(place.house_id, place.id, placeName);
  };

  const onRemovePlace = (houseId: number, placeId: number) => {
    dispatch(necessityActions.removePlace(houseId, placeId));
  };

  const deletePlace = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    window.confirm(`[ ${props.place.name} ]을/를 정말 삭제하시겠습니까?`)
      && onRemovePlace(place.house_id, place.id);
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
    } else if (updateStatus === necessityStatus.SUCCESS) {
      closeModal();
    }
  }, [createStatus, updateStatus]);

  useEffect(() => {
    houseActions.getHouse(props.place.house_id);
  }, [getHouseStatus, props.place.house_id]);

  useEffect(() => {
    userActions.getMe();
  }, [getMeStatus]);

  return (
    <div className="PlaceBox">
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
      <div className="title-wrapper">
        <h3>
          <EdiText
            viewContainerClassName="place-update-box"
            editButtonContent={<i className="fas fa-pencil-alt" />}
            saveButtonContent={<i className="fas fa-check" />}
            cancelButtonContent={<i className="fas fa-times" />}
            hideIcons
            type="text"
            showButtonsOnHover
            submitOnUnfocus
            submitOnEnter
            cancelOnEscape
            inputProps={{
              className: 'place-update-input',
              placeholder: 'Place 이름을 입력하세요.',
              style: { fontSize: 18 },
            }}
            validationMessage="한 글자 이상 입력하세요."
            validation={(val) => val.length > 0}
            value={place.name}
            onSave={savePlace}
          />
        </h3>
        {house?.users
          .map((user) => user.username === me.username && user.is_leader)
          .includes(true) && (
          <button
            className="place-delete-button"
            type="button"
            onClick={deletePlace}
          >
            <i className="fas fa-times fa-2x" />
          </button>
        )}
      </div>

      <NecessityList
        place={place}
        updateNecessity={updateNecessity}
        createNecessity={createNecessity}
      />
    </div>
  );
}

export default PlaceBox;
