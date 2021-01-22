import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { History } from 'history';
import Modal from 'react-modal';
import { House } from '../../api';
import { HouseInviteModal, HouseManageModal } from '../../components';
import './HousePage.scss';

interface Props {
  history: History;
  house: House;
}

function HousePage(props: Props) {
  const [houses, setHouses] = useState<[House]>();
  const [nameToCreate, setNameToCreate] = useState('');
  const [introductionToCreate, setIntroductionToCreate] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [houseToBeManaged, setHouseToBeManaged] = useState<House>();
  const [houseToBeInvited, setHouseToBeInvited] = useState<House>();

  const manageHouse = (house: House) => {
    setHouseToBeManaged(house);
    setIsManageModalOpen(true);
  };

  const InviteUser = (house: House) => {
    setHouseToBeInvited(house);
    setIsInviteModalOpen(true);
  };

  const closeModal = () => {
    setIsInviteModalOpen(false);
    setIsManageModalOpen(false);
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
    <div className="house-card" key={index}>
      <div className="text-info">
        <h1 className="house-name">
          {house.name}
        </h1>
        <p className="house-intro">
          {house.introduction}
        </p>
      </div>
      {/* <button */}
      {/* type="button" */}
      {/* onClick={() => goToTheRoom(house.id)} */}
      {/* > */}
      {/* 들어가기 */}
      {/* </button> */}
      <div className="button-wrapper">
        <button
          type="button"
          onClick={() => manageHouse(house)}
        >
          설정
        </button>
        <button
          type="button"
          onClick={() => InviteUser(house)}
        >
          초대
        </button>
      </div>
    </div>
  ));

  return (
    <main>
      <section>
        <div className="header-wrapper">
          <h1>방 목록</h1>
          <button className="create-button" type="button">추가</button>
        </div>
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

      <Modal
        isOpen={(isManageModalOpen || isInviteModalOpen)}
        onRequestClose={closeModal}
        className="create-modal"
        overlayClassName="create-modal-overlay"
      >
        {(isManageModalOpen)
          ? (<HouseManageModal house={houseToBeManaged} />)
          : (<HouseInviteModal house={houseToBeInvited} />)}
      </Modal>
    </main>
  );
}

export default HousePage;
