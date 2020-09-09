import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface House {
  id: string;
  name: string;
  introduction: string;
}

interface Props {
  history: any;
}

function HouseList(props: Props) {
  const [houses, setHouses] = useState<[House]>();

  const goInTheRoom = (houseId: string) => {
    const url = `/main/${houseId}`;
    props.history.push(url);
  };

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();

    axios.get('/api/v1/house/', { cancelToken: source.token })
      .then((res) => setHouses(res.data));

    return () => {
      source.cancel();
    };
  }, []);

  const returnUserHouses = houses?.map((house, index) => (
    <div key={index}>
      <h1>
        {house.name}
      </h1>
      <h2>
        {house.introduction}
      </h2>
      <button
        type="button"
        onClick={() => goInTheRoom(house.id)}
      >
        들어가기
      </button>
      <hr />
    </div>
  ));

  return (
    <>
      { returnUserHouses }
    </>
  );
}

export default HouseList;
