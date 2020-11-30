import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { History } from 'history';
import Modal from 'react-modal';
import { House } from '../../api';
import { HouseInviteButton } from '../../components';

interface Props {
  history: History;
  house: House;
}

function HousePage(props: Props) {
  const [houses, setHouses] = useState<[House]>();
  const [nameToCreate, setNameToCreate] = useState('');
  const [introductionToCreate, setIntroductionToCreate] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [houseToBeInvited, setHouseToBeInvited] = useState<House>();

  const { house } = props;

  const inviteHouse = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setHouseToBeInvited(undefined);
    setModalOpen(false);
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
      {/* <button
        type="button"
        onClick={() => }
      >
        초대하기
      </button> */}
      <HouseInviteButton
        houseId={house.id}
        houseToBeInvited={houseToBeInvited}
      />
      <hr />
    </div>
  ));

  return (
    <main>
      <section>
        <form onSubmit={createHouse}>
          <label>
            Name:
            <input
              type="text"
              onChange={(e) => setNameToCreate(e.target.value)}
            />
          </label>
          <label>
            Introduction:
            <input
              type="text"
              onChange={(e) => setIntroductionToCreate(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </section>
      <section>
        {showUserHouses}
      </section>
    </main>
  );
}

export default HousePage;
