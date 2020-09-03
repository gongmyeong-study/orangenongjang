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
              option={necessity.option}
              price={necessity.price}
              necessityUserId={necessity.necessity_user.id}
            />
          </td>
          <td>
            <NecessityCounter
              key={necessity.necessity_user.id}
              necessityUserId={necessity.necessity_user.id}
              count={necessity.necessity_user.count}
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
