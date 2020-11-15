import React from 'react';
import './NecessityList.css';
import { Necessity } from '../../../api';
import NecessityItem from '../NecessityItem/NecessityItem';
import NecessityCounter from '../NecessityCounter/NecessityCounter';

interface Props {
  necessities: Necessity[];
}

function NecessityList(props: Props) {
  return (
    <>
      { props.necessities?.length ? props.necessities.map((necessity) => (
        <div
          className="necessity-list-block"
          key={necessity.id}
        >
          <div className="necessity-item-block">
            <NecessityItem
              necessity={necessity}
            />
          </div>
          <div>
            <NecessityCounter
              key={necessity.id}
              placeId={necessity.place_id}
              necessityId={necessity.id}
              count={necessity.count}
            />
          </div>
        </div>
      )) : (
        <h2>
          첫 생필품을 추가해보세요!
        </h2>
      )}
    </>
  );
}

export default NecessityList;
