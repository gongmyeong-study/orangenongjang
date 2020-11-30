import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { History } from 'history';
import Modal from 'react-modal';
import { House } from '../../api';
import { HouseInviteButton, HouseManageButton } from '../../components';

interface Props {
  history: History;
  house: House;
}

function HousePage(props: Props) {
  const [houses, setHouses] = useState<[House]>();
  const [nameToCreate, setNameToCreate] = useState('');
  const [introductionToCreate, setIntroductionToCreate] = useState('');
  const [isInviteModalOpen, setInviteModalOpen] = useState(false);
  const [isManageModalOpen, setManageModalOpen] = useState(false);
  const [houseToBeInvited, setHouseToBeInvited] = useState<House>();
  const [houseToManage, setHouseToManage] = useState<House>();

  const inviteHouse = () => {
    setInviteModalOpen(true);
  };

  const manageHouse = () => {
    setManageModalOpen(true);
  };

  const closeModal = () => {
    setHouseToBeInvited(undefined);
    setInviteModalOpen(false);
    setHouseToManage(undefined);
    setManageModalOpen(false);
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

  const goToTheRoom = (houseId: number) => {
    const url = `/main/${houseId}`;
    props.history.push(url);
  };

  const createHouse = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('/api/v1/house/', { name: nameToCreate, introduction: introductionToCreate })
      .then((res) => {
        const { data } = res;
        goToTheRoom(data.id);
      });
  };

  const showUserHouses = houses?.map((house, index) => (
    <div key={index}>
      <h1>
        {house.name}
      </h1>
      <h2>
        {house.introduction}
      </h2>
      <button
        type="button"
        onClick={() => goToTheRoom(house.id)}
      >
        들어가기
      </button>

      <Modal
        isOpen={isManageModalOpen}
        onRequestClose={closeModal}
        className="create-modal"
        overlayClassName="create-modal-overlay"
      >
        <HouseManageButton
          houseId={house.id}
          LeaderToToss={houseToManage}
          users={house.users}
        />
      </Modal>
      <button
        type="button"
        onClick={() => manageHouse()}
      >
        관리하기
      </button>

      <Modal
        isOpen={isInviteModalOpen}
        onRequestClose={closeModal}
        className="create-modal"
        overlayClassName="create-modal-overlay"
      >
        <HouseInviteButton
          houseId={house.id}
          houseToBeInvited={houseToBeInvited}
          users={house.users}
        />
      </Modal>
      <button
        type="button"
        onClick={() => inviteHouse()}
      >
        초대하기
      </button>
      <hr />
    </div>
  ));

  return (
    <main>
      <section>
        <form onSubmit={createHouse}>
          <label>
            House 이름 :
            <input
              type="text"
              onChange={(e) => setNameToCreate(e.target.value)}
            />
          </label>
          &emsp;
          <label>
            House 소개 :
            <input
              type="text"
              onChange={(e) => setIntroductionToCreate(e.target.value)}
            />
          </label>
          <input type="submit" value="House 만들기" />
        </form>
      </section>
      <section>
        {showUserHouses}
      </section>
    </main>
  );
}

export default HousePage;
