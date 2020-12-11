import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { History } from 'history';
import Modal from 'react-modal';
import { House } from '../../api';
import { HouseInviteModal, HouseManageModal } from '../../components';

interface Props {
  history: History;
  house: House;
}

function HousePage(props: Props) {
  const [houses, setHouses] = useState<[House]>();
  const [nameToCreate, setNameToCreate] = useState('');
  const [introductionToCreate, setIntroductionToCreate] = useState('');
  const [idInviteModalOpen, setInviteModalOpen] = useState(-1);
  const [idManageModalOpen, setManageModalOpen] = useState(-1);

  const openInviteUser = (houseId: number) => {
    setInviteModalOpen(houseId);
  };

  const openManageHouse = (houseId: number) => {
    setManageModalOpen(houseId);
  };

  const closeModal = () => {
    setInviteModalOpen(-1);
    setManageModalOpen(-1);
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
      })
      .catch(() => {
        window.alert('같은 이름의 집을 가지고 있거나 요청에 문제가 있습니다.');
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
        isOpen={(idManageModalOpen === house.id)}
        onRequestClose={closeModal}
        className="create-modal"
        overlayClassName="create-modal-overlay"
      >
        <HouseManageModal
          houseId={house.id}
          users={house.users}
        />
      </Modal>

      <Modal
        isOpen={(idInviteModalOpen === house.id)}
        onRequestClose={closeModal}
        className="create-modal"
        overlayClassName="create-modal-overlay"
      >
        <HouseInviteModal
          houseId={house.id}
          houseName={house.name}
          users={house.users}
        />
      </Modal>

      <button
        type="button"
        onClick={() => openManageHouse(house.id)}
      >
        관리하기
      </button>

      <button
        type="button"
        onClick={() => openInviteUser(house.id)}
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
            이름:
            <input
              type="text"
              onChange={(e) => setNameToCreate(e.target.value)}
            />
          </label>
          &emsp;
          <label>
            소개:
            <input
              type="text"
              onChange={(e) => setIntroductionToCreate(e.target.value)}
            />
          </label>
          <input type="submit" value="집 생성" disabled={!nameToCreate} />
        </form>
      </section>
      <section>
        {showUserHouses}
      </section>
    </main>
  );
}

export default HousePage;
