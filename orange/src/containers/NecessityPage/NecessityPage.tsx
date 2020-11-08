import React, {
  Dispatch, useEffect, useState,
} from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { connect } from 'react-redux';
import { History } from 'history';
import {
  NecessityCreateModal, NecessityHead, NecessityList, NecessityTemplate,
} from '../../components';
import { necessityActions } from '../../store/actions';
import './NecessityPage.css';

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

const GlobalStyle = createGlobalStyle`
    body {
        background: #e9ecef;
    }
`;

interface Props {
  history: History;
  onGetNecessityHouse(houseId: number): void;
  houseId: number;
}

function NecessityPage(props: Props) {
  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [showNecessityCreateModal, setShowNecessityCreateModal] = useState(false);
  const showModal = (): void => setShowNecessityCreateModal(true);

  const restoreModal = () => {
    setShowNecessityCreateModal(false);
  };

  const fetchNecessityHouse = () => {
    props.onGetNecessityHouse(props.houseId);
  };

  useEffect(() => {
    fetchNecessityHouse();
  });

  return (
    <>
      <span>
        <h1 className="NecessityPageBlock">{dateString}</h1>
      </span>

      <GlobalStyle />
      <NecessityTemplate>
        <NecessityHead />
        <div className="necessity-list-column">
          <CircleButton onClick={showModal}>
            <MdAdd />
          </CircleButton>
          {showNecessityCreateModal ? (
            <NecessityCreateModal
              history={props.history}
              restoreModal={restoreModal}
              houseId={props.houseId}
            />
          ) : null}
          <NecessityList />
        </div>
      </NecessityTemplate>
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onGetNecessityHouse: (houseId: number) => dispatch(
    necessityActions.getNecessityHouse(houseId),
  ),
});

export default connect(null, mapDispatchToProps)(NecessityPage);
