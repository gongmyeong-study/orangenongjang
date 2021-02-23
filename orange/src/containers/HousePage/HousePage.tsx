/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiFillCrown } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { History } from 'history';
import Modal from 'react-modal';

import { House, User } from '../../api';
import { userActions } from '../../store/actions/index';
import { OrangeGlobalState } from '../../store/state';
import { HouseCreateForm, HouseInviteModal, HouseManageModal } from '../../components';

import './HousePage.scss';

interface Props {
  history: History;
  house: House;
  me: User;
}

function HousePage(props: Props) {
  const [houses, setHouses] = useState<[House]>();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isCreateHouseModalOpen, setIsCreateHouseModalOpen] = useState(false);
  const [houseToBeManaged, setHouseToBeManaged] = useState<House>();
  const [houseToBeInvited, setHouseToBeInvited] = useState<House>();
  const { getMeStatus, me } = useSelector((state: OrangeGlobalState) => state.user);

  const manageHouse = (e: any, house: House) => {
    e.stopPropagation();
    setHouseToBeManaged(house);
    setIsManageModalOpen(true);
  };

  const InviteUser = (e: any, house: House) => {
    e.stopPropagation();
    setHouseToBeInvited(house);
    setIsInviteModalOpen(true);
  };

  const closeModal = () => {
    if (isInviteModalOpen) {
      setIsInviteModalOpen(false);
    } else if (isManageModalOpen) {
      setIsManageModalOpen(false);
    } else setIsCreateHouseModalOpen(false);
  };

  useEffect(() => {
    Modal.setAppElement('body');
    const { CancelToken } = axios;
    const source = CancelToken.source();

    axios.get('/api/v1/house/', { cancelToken: source.token })
      .then((res) => setHouses(res.data));

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    userActions.getMe();
  }, [getMeStatus]);

  const goToTheRoom = (houseId: number) => {
    const url = `/main/${houseId}`;
    props.history.push(url);
  };

  const showInitialContets = () => (
    <div className="initial-contents">
      <p>
        동거인과 함께 사는 당신의 집을 생성해 주세요
        <span role="img" aria-label="handshake"> 🤝</span>
      </p>
      <button className="create-button" type="button" onClick={() => setIsCreateHouseModalOpen(true)}>집 생성하기</button>
    </div>
  );

  const showUserHouses = houses?.map((house, index) => (
    <>
      <div className="house-card" key={index} onClick={() => goToTheRoom(house.id)}>
        <div className="house-name-intro">
          <h2 className="house-name">
            {house.users.map((user) => (
              user.username === me.username && user.is_leader)).includes(true)
               && (
               <div>
                 <AiFillCrown />
                 &nbsp;
               </div>
               )}
            {house.name}
          </h2>
          <br />
          <br />
          <br />
          <div className="house-intro">
            {house.introduction}
          </div>
        </div>
        <div
          className="right-info"
        >
          <button
            type="button"
            onClick={(e) => manageHouse(e, house)}
          >
            <p>
              멤버
              {' '}
              {house.users.length}
              명
            </p>
          </button>
          <div className="button-wrapper">
            <button
              type="button"
              onClick={(e) => manageHouse(e, house)}
            >
              관리
            </button>
            <button
              type="button"
              onClick={(e) => InviteUser(e, house)}
            >
              초대
            </button>
          </div>
        </div>
      </div>
    </>
  ));

  return (
    <main className="house-page-wrapper">
      {houses?.length
        ? (
          <section>
            <div className="header-wrapper">
              <h1>집 목록</h1>
              <button className="create-button" type="button" onClick={() => setIsCreateHouseModalOpen(true)}>추가</button>
            </div>
            {showUserHouses}
          </section>
        )
        : showInitialContets()}
      <Modal
        isOpen={(isManageModalOpen || isInviteModalOpen) || isCreateHouseModalOpen}
        onRequestClose={closeModal}
        className="create-modal"
        overlayClassName="create-modal-overlay"
      >
        {/*  eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button className="close-button" type="button" onClick={closeModal}><i className="fas fa-times fa-2x" /></button>
        {isManageModalOpen && <HouseManageModal house={houseToBeManaged} />}
        {isInviteModalOpen && <HouseInviteModal house={houseToBeInvited} />}
        {isCreateHouseModalOpen && <HouseCreateForm />}
      </Modal>
    </main>
  );
}

export default HousePage;
