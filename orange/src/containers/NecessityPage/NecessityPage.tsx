import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import Modal from 'react-modal';
import { History } from 'history';
import { Button } from '@material-ui/core';

import { PlaceBox, PlaceCreateForm } from '../../components';
import { necessityStatus } from '../../constants/constants';
import { OrangeGlobalState } from '../../store/state';
import { houseActions } from '../../store/actions/index';

import './NecessityPage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  houseId: number;
  history: History;
}

function NecessityPage(props: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { createPlaceStatus, places } = useSelector(
    (state: OrangeGlobalState) => state.necessity,
  );
  const { house } = useSelector((state: OrangeGlobalState) => state.house);
  const dispatch = useDispatch();

  const onGetHouse = (houseId: number) => {
    dispatch(houseActions.getHouse(houseId));
  };

  const closeModal = () => {
    setModalOpen(false);
  }

  useEffect(() => {
    onGetHouse(props.houseId);
    if (createPlaceStatus === necessityStatus.SUCCESS) {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createPlaceStatus]);

  useEffect(() => {
    houseActions.getHouse(props.houseId);
  }, [props.houseId]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="create-modal"
        overlayClassName="create-modal-overlay"
      >
        <PlaceCreateForm houseId={props.houseId} closeModal={closeModal}/>
      </Modal>
      <div className="placebox-wrapper">
        <h1 className="NecessityPageBlock">{house?.name}</h1>
        <Slider
          className="slider"
          dots
          slidesToShow={1.6}
          slidesToScroll={1}
          infinite={false}
        >
          {Boolean(places)
            && places.map((place) => <PlaceBox place={place} key={place.id} />)}
          <div
            className="create-place-box"
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button className="create-place" onClick={() => setModalOpen(true)}>
              <i className="fas fa-plus fa-7x" />
            </Button>
          </div>
        </Slider>
      </div>
    </>
  );
}

export default NecessityPage;
