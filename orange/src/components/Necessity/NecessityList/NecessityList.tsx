import React from 'react';
import './NecessityList.css';
import { Button } from '@material-ui/core';
import { Necessity, Place } from '../../../api';
import NecessityItem from '../NecessityItem/NecessityItem';
import NecessityRemoveButton from '../NecessityRemoveButton/NecessityRemoveButton';
import NecessityUpdateButton from '../NecessityUpdateButton/NecessityUpdateButton';
import NecessityCounterButton from '../NecessityCounterButton/NecessityCounterButton';

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
        <div className="create-button-wrapper">
          <Button onClick={props.createNecessity}>
            <i className="fas fa-plus" />
          </Button>
        </div>
        <div className="necessity-list-wrapper">
          { place.necessities?.length
            ? place.necessities?.map((necessity: Necessity) => (
              <div className="necessity-item-and-counter-wrapper" key={necessity.id}>
                <div className="necessity-item-wrapper">
                  <NecessityItem necessity={necessity} />
                  <div className="edit-wrapper">
                    <NecessityUpdateButton
                      updateNecessity={props.updateNecessity}
                      necessity={necessity}
                    />
                    <NecessityRemoveButton placeId={place.id} necesstiyId={necessity.id} />
                  </div>
                </div>
                <div className="counter-wrapper only-on-desktop">
                  <NecessityCounterButton
                    placeId={place.id}
                    necessityId={necessity.id}
                    count={necessity.count}
                    countType="add"
                  />
                  <h5>
                    {necessity.count}
                    개
                  </h5>
                  <NecessityCounterButton
                    placeId={place.id}
                    necessityId={necessity.id}
                    count={necessity.count}
                    countType="subtract"
                  />
                </div>
              </div>
            ))
            : (
              <h2>
                {place.name}
                에
                첫 생필품을 추가해보세요!
              </h2>
            )}
        </div>
      </section>
    </>
  );
}

export default NecessityList;
