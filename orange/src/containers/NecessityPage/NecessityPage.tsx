import React, { Dispatch, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';
import { History } from 'history';
import { NecessityTemplate, PlaceBox } from '../../components';
import { necessityActions } from '../../store/actions';
import { Place } from '../../api';
import { OrangeGlobalState } from '../../store/state';
import './NecessityPage.css';

const GlobalStyle = createGlobalStyle`
    body {
        background: #e9ecef;
    }
`;

interface Props {
  history: History;
  onGetHouse(houseId: number): void;
  places: Place[];
  houseId: number;
}

function NecessityPage(props: Props) {
  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const fetchHouse = () => {
    props.onGetHouse(props.houseId);
  };

  useEffect(() => {
    fetchHouse();
  }, []);

  return (
    <>
      <span>
        <h1 className="NecessityPageBlock">{dateString}</h1>
      </span>

      <GlobalStyle />
      <NecessityTemplate>
        <PlaceBox history={props.history} />
      </NecessityTemplate>
    </>
  );
}

const mapStateToProps = (state: OrangeGlobalState) => ({
  places: state.necessity.places,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onGetHouse: (houseId: number) => dispatch(
    necessityActions.getHouse(houseId),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(NecessityPage);
