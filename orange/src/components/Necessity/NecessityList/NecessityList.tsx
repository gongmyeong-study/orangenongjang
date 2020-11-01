import React from 'react';
import './NecessityList.css';
import { Necessity } from '../../../api';
import NecessityItem from '../NecessityItem/NecessityItem';
import NecessityCounter from '../NecessityCounter/NecessityCounter';

interface Props {
  necessities: [Necessity];
}

function NecessityList(props: Props) {
  const { necessities } = props;

  return (
    <>
      {necessities.map((necessity) => (

        <div
          className="necessity-list-block"
          key={necessity.id}
        >
          <div className="necessity-item-block">
            <NecessityItem
              key={necessity.id}
              id={necessity.id}
              name={necessity.name}
              count={necessity.count}
              description={necessity.description}
              option={necessity.option}
              price={necessity.price}
              houseId={necessity.house_id}
              necessityId={necessity.id}
            />
          </div>
          <div>
            <NecessityCounter
              key={necessity.id}
              houseId={necessity.house_id}
              necessityId={necessity.id}
              count={necessity.count}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default NecessityList;
