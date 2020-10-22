import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';

interface House {
  id: string;
  name: string;
  introduction: string;
  users?: object;
}

interface Props {
  history: any;
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

  const goToTheRoom = (houseId: string) => {
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
              placeholder="예쁜 우리집"
            />
          </label>
          <label>
            Introduction:
            <input
              type="text"
              onChange={(e) => setIntroductionToCreate(e.target.value)}
              placeholder="친구들과 함께 사는 공간"
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
