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

const CircleButton = styled.button`
    background: #38d9a9;
    &:hover {
        background: #63e6be;
    }
    &:active {
        opacity: 0.2;
        background: #20c997;
    }
    
    z-index: 0;
    cursor: pointer;
    width: 80px;
    height: 80px;
    display: block;
    align-items: center;
    justify-content: center;
    font-size: 60px;
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%, 50%);
    color: white;
    border-radius: 50%;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
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
        <NecessityList />
        <CircleButton onClick={showModal}>
          <MdAdd />
        </CircleButton>
        {showNecessityCreateModal ? (
          <NecessityCreateModal
            history={props.history}
            restoreModal={restoreModal}
          />
        ) : null}
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
