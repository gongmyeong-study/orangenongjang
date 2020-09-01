import React, {
  useState, useEffect, ReactElement, Dispatch,
} from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { connect } from 'react-redux';

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
    height: 106.8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    position : static;
    left: 100%
    padding: 150px 150px;
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
  history: any;
  get(): void;
}

function NecessityPage(props: Props): ReactElement {
  const [showNecessityCreateModal, setShowNecessityCreateModal] = useState(false);
  const showModal = (): void => setShowNecessityCreateModal(true);

  const restoreModal = () => {
    setShowNecessityCreateModal(false);
  };

  useEffect(() => {
    props.get();
  });

  return (
    <>
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
            />
          ) : null}

          <NecessityList />
        </div>
      </NecessityTemplate>
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  get: (): void => dispatch(
    necessityActions.getNecessity(),
  ),
});

export default connect(null, mapDispatchToProps)(NecessityPage);
