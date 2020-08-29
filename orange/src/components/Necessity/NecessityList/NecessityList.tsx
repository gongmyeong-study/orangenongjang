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
      <div className="necessity-counter-block">
        <span>
          {Array.from(necessities).map((necessity: any) => (
            <NecessityItem
              key={necessity.id}
              id={necessity.id}
              name={necessity.name}
              option={necessity.option}
              price={necessity.price}
              necessityUserId={necessity.necessity_user.id}
            />
          ))}
        </span>
        <span>
          {Array.from(necessities).map((necessity: any) => (
            <NecessityCounter
              key={necessity.necessity_user.id}
              necessityUserId={necessity.necessity_user.id}
              count={necessity.necessity_user.count}
            />
          ))}
        </span>
      </div>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  necessities: state.necessity.necessities,
});

export default connect(mapStateToProps)(NecessityList);
