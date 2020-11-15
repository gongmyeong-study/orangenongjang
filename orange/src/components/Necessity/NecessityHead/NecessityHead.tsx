import React, { useState } from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { Necessity, Place } from '../../../api';
import { OrangeGlobalState } from '../../../store/state';
import NecessityList from '../NecessityList/NecessityList';
import './NecessityHead.css';
import NecessityCreateModal from '../NecessityCreateModal/NecessityCreateModal';

const CircleButton = styled.button`
    background: lightgray;
    transition: 0.3s;
    &:hover {
        background: gray;
    }
    &:active {
        opacity: 0.2;
        background: gray;
    }
    
    z-index: 0;
    cursor: pointer;
    width: 160px;
    height: 137.69px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    position : static;
    left: 10%;
    bottom: 20px;
    color: white;
    border-radius: 10%;
    border: none;
    outline: none;
`;

interface Props {
  history: History;
  places: Place[];
}

function NecessityHead(props: Props) {
  let name = '';
  let necessities: Necessity[] = [];
  let placeId = 0;

  // FIXME: 하나의 house 내 여러 개의 place를 보여주는 것은 구현이 안 되어있고, 항상 첫 번째 place를 보여줌
  if (props.places.length) {
    name = props.places[0].name;
    necessities = props.places[0].necessities;
    placeId = props.places[0].id;
  }

  const [showNecessityCreateModal, setShowNecessityCreateModal] = useState(false);
  const showModal = (): void => setShowNecessityCreateModal(true);

  const restoreModal = () => {
    setShowNecessityCreateModal(false);
  };

  return (
    <div
      className="NecessityHeadBlock"
    >
      <h1>{name}</h1>
      <NecessityList necessities={necessities} />
      <div className="necessity-list-column">
        <CircleButton onClick={showModal}>
          <MdAdd />
        </CircleButton>
        {showNecessityCreateModal ? (
          <NecessityCreateModal
            history={props.history}
            restoreModal={restoreModal}
            placeId={placeId}
          />
        ) : null}
      </div>

    </div>
  );
}

const mapStateToProps = (state: OrangeGlobalState) => ({
  places: state.necessity.places,
});

export default connect(mapStateToProps)(NecessityHead);
