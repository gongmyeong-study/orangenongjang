import React from 'react';
import './NecessityList.css';
import { Button } from '@material-ui/core';
import { Necessity, Place } from '../../../api';
import NecessityItem from '../NecessityItem/NecessityItem';

interface Props {
  place: Place;
  createNecessity: () => void;
  updateNecessity: (necessity: Necessity) => void;
}

function NecessityList(props: Props) {
  const { place } = props;

  return (
    <>
      <section className="necessity-list">
        <div className="necessity-wrapper">
          <Button onClick={props.createNecessity}>
            <i className="fas fa-plus" />
          </Button>
        </div>
        { place.necessities.length
          ? place.necessities.map((necessity: Necessity) => (
            <div className="necessity-wrapper">
              <NecessityItem necessity={necessity} />
              <Button onClick={() => props.updateNecessity(necessity)}><i className="far fa-edit" /></Button>
            </div>
          ))
          : (
            <h2>
              {place.name}
              에
              첫 생필품을 추가해보세요!
            </h2>
          )}
      </section>
    </>
  );
}

export default NecessityList;
