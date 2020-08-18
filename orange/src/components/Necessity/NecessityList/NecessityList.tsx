import React from 'react';
import { connect } from 'react-redux';
import NecessityItem from '../NecessityItem/NecessityItem';
import './NecessityList.css';

interface Props {
  necessities: any;
}

function NecessityList(props: Props) {
  const { necessities } = props;

  return (
    <div className="necessity-list-block">

      {necessities.map((necessity: any) => (
        <NecessityItem
          key={necessity.id}
          id={necessity.id}
          name={necessity.name}
          option={necessity.option}
          price={necessity.price}
        />
      ))}

    </div>
  );
}

const mapStateToProps = (state: any) => ({
  necessities: state.necessity.necessities,
});

export default connect(mapStateToProps)(NecessityList);