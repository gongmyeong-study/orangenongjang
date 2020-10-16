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
          <td className="necessity-item-block">
            <NecessityItem
              key={necessity.id}
              id={necessity.id}
              name={necessity.name}
              count={necessity.count}
              option={necessity.option}
              price={necessity.price}
              necessityHouseId={necessity.necessity_house.id}
            />
          </td>
          <td>
            <NecessityCounter
              key={necessity.necessity_house.id}
              necessityHouseId={necessity.necessity_house.id}
              count={necessity.necessity_house.count}
            />
          </td>
        </div>
      ))}
    </>
  );
}

const mapStateToProps = (state: any) => ({
  necessities: state.necessity.necessities,
});

export default connect(mapStateToProps)(NecessityList);
