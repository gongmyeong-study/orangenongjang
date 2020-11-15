import React from 'react';
import { connect } from 'react-redux';
import './NecessityList.css';
import { NecessityHouse } from '../../../api';
import NecessityItem from '../NecessityItem/NecessityItem';
import NecessityCounter from '../NecessityCounter/NecessityCounter';
import { OrangeGlobalState } from '../../../store/state';

interface Props {
  necessityHouse: NecessityHouse;
}

function NecessityList(props: Props) {
  const { necessityHouse } = props;

  return (
    <>
      { necessityHouse.necessities?.length ? necessityHouse.necessities.map((necessity) => (

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
              houseId={necessity.house_id}
              necessityId={necessity.id}
              count={necessity.count}
            />
          </div>
        </div>
      )) : (
        <h2>
          {necessityHouse.name}
          에 첫 생필품을 추가해보세요!
        </h2>
      )}
    </>
  );
}

const mapStateToProps = (state: OrangeGlobalState) => ({
  necessityHouse: state.necessity.necessityHouse,
});

export default connect(mapStateToProps)(NecessityList);
