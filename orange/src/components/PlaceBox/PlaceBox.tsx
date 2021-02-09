import React, { useEffect, useState } from 'react';
import EdiText from 'react-editext';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import {
  Necessity, Place, House, User,
} from '../../api';
import { houseActions, necessityActions, userActions } from '../../store/actions/index';
import { OrangeGlobalState } from '../../store/state';
import NecessityList from '../Necessity/NecessityList/NecessityList';
import './PlaceBox.css';
import NecessityCreateOrUpdateForm from '../Necessity/NecessityCreateOrUpdateForm/NecessityCreateOrUpdateForm';
import { necessityStatus } from '../../constants/constants';

interface Props {
  place: Place;
  myHouse?: House;
  me? : User;
}

function PlaceBox(props: Props) {
  const { place } = props;
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [necessityToBeUpdated, setNecessityToBeUpdated] = useState<Necessity>();
  const { getHouseStatus, house } = useSelector((state: OrangeGlobalState) => state.house);
  const { getMeStatus, me } = useSelector((state: OrangeGlobalState) => state.user);
  const {
    createStatus, updateStatus, updatePlaceStatus, removePlaceStatus,
  } = useSelector(
    (state: OrangeGlobalState) => state.necessity,
  );

  const updateNecessity = (necessity: Necessity) => {
    setNecessityToBeUpdated(necessity);
    setModalOpen(true);
  };

  const onRenamePlace = (houseId: number, placeId: number, placeName: string) => {
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
    } if (createStatus === necessityStatus.FAILURE) {
      alert(`생필품 생성에 실패했어요ㅠㅠ \n 에러 메시지 : ${createStatus}`);
    }
    if (updateStatus === necessityStatus.SUCCESS) {
      closeModal();
    } if (updateStatus === necessityStatus.FAILURE) {
      alert(`생필품 수정에 실패했어요ㅠㅠ\n 에러 메시지 : ${updateStatus}`);
    }
    if (updatePlaceStatus === necessityStatus.FAILURE) {
      alert(`Place 이름 변경에 실패했어요ㅠㅠ\n 에러 메시지 : ${updatePlaceStatus}`);
    }

    if (removePlaceStatus === necessityStatus.FAILURE) {
      alert(`Place 삭제에 실패했어요ㅠㅠ\n 에러 메시지 : ${removePlaceStatus}`);
    } if (removePlaceStatus === necessityStatus.FAILURE_NOT_FOUND) {
      alert('존재하지 않는 Place입니다.');
    } if (removePlaceStatus === necessityStatus.FAILURE_MEMBER) {
      alert('House 멤버만 Place를 삭제할 수 있습니다.');
    } if (removePlaceStatus === necessityStatus.FAILURE_LEADER) {
      alert('Leader만 Place를 삭제할 수 있습니다.');
    }
  }, [createStatus, updateStatus, updatePlaceStatus, removePlaceStatus]);

  useEffect(() => {
    houseActions.getHouse(props.place.house_id);
  }, [getHouseStatus, props.place.house_id]);

  useEffect(() => {
    userActions.getMe();
  }, [getMeStatus]);

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
        {house?.users.map(
          (user) => (user.username === me.username && user.is_leader)).includes(true)

          && (
          <button
            className="place-delete-button"
            type="button"
            onClick={deletePlace}
          >
            <i className="fas fa-times fa-2x" />
          </button>
        )}

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
