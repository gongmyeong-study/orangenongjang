import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { History } from 'history';
import { House } from '../../api';

interface Props {
  history: History;
}

function HousePage(props: Props) {
  const [houses, setHouses] = useState<[House]>();
  const [nameToCreate, setNameToCreate] = useState('');
  const [introductionToCreate, setIntroductionToCreate] = useState('');

  useEffect(() => {
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
