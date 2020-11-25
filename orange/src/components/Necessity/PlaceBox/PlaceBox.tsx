import React, { useState } from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { Necessity, Place } from '../../../api';
import { OrangeGlobalState } from '../../../store/state';
import NecessityList from '../NecessityList/NecessityList';
import './PlaceBox.css';
import NecessityCreateModal from '../NecessityCreateModal/NecessityCreateModal';

interface Props {
  history: History;
  places: Place[];
}

function PlaceBox(props: Props) {
  const name = '';
  const necessities: Necessity[] = [];
  const placeId = 0;

  const place = props.places[0];

  // FIXME: 하나의 house 내 여러 개의 place를 보여주는 것은 구현이 안 되어있고, 항상 첫 번째 place를 보여줌
  // if (props.places.length) {
  //   name = props.places[0].name;
  //   necessities = props.places[0].necessities;
  //   placeId = props.places[0].id;
  console.log('vmfhqtm');
  console.log(props.places);
  // }

  return (
    <div
      className="PlaceBox"
    >
      <h1>{Boolean(props.places.length) && place.name}</h1>
      {Boolean(props.places.length) && <NecessityList place={place} />}
    </div>
  );
}

const mapStateToProps = (state: OrangeGlobalState) => ({
  places: state.necessity.places,
});

export default connect(mapStateToProps)(PlaceBox);
