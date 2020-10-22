import React from 'react';
import { connect } from 'react-redux';
import NecessityItem from '../NecessityItem/NecessityItem';
import NecessityCounter from '../NecessityCounter/NecessityCounter';
import './NecessityList.css';

interface Props {
  necessities: any;
}

function NecessityList(props: Props) {
  const { necessities } = props;

  return (
    <>
      {Array.from(necessities).map((necessity: any) => (
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

const mapStateToProps = (state: any) => ({
  necessities: state.necessity.necessities,
});

export default connect(mapStateToProps)(NecessityList);
