import React, { Dispatch, useEffect } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import Slider from 'react-slick';
import { NecessityTemplate, PlaceBox } from '../../components';
import { necessityActions } from '../../store/actions';
import { Place } from '../../api';
import { OrangeGlobalState } from '../../store/state';
import './NecessityPage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="placebox-wrapper">
      <h1 className="NecessityPageBlock">{dateString}</h1>
      <Slider className="slider" dots slidesToShow={2} slidesToScroll={1} infinite={false}>
        <NecessityTemplate>
          <PlaceBox history={props.history} />
        </NecessityTemplate>
        <NecessityTemplate>
          <PlaceBox history={props.history} />
        </NecessityTemplate>
        <NecessityTemplate>
          <PlaceBox history={props.history} />
        </NecessityTemplate>
      </Slider>
    </div>
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
