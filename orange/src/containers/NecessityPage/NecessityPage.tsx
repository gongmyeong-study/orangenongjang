import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import Modal from 'react-modal';
import { History } from 'history';
import { Button } from '@material-ui/core';
import { PlaceBox, PlaceCreateForm } from '../../components';
import { OrangeGlobalState } from '../../store/state';
import './NecessityPage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getHouse } from '../../store/actions/necessity/necessity';
import { necessityStatus } from '../../constants/constants';

interface Props {
  houseId: number;
  history: History;
}

function NecessityPage(props: Props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const { createStatus, places } = useSelector((state: OrangeGlobalState) => state.necessity);
  const { getHouseStatus, house } = useSelector((state: OrangeGlobalState) => state.house);
  const dispatch = useDispatch();

  const onGetHouse = (
    houseId: number,
  ) => {
    dispatch(getHouse(houseId));
  };

  useEffect(() => {
    onGetHouse(props.houseId);
    if (createStatus === necessityStatus.SUCCESS) {
      setModalOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createStatus]);

  useEffect(() => {
    getHouse(props.houseId);
  }, [props.houseId]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="create-modal"
        overlayClassName="create-modal-overlay"
      >
        <PlaceCreateForm houseId={props.houseId} />
      </Modal>
      <div className="placebox-wrapper">
        <h1 className="NecessityPageBlock">{house?.name}</h1>
        <Slider className="slider" dots slidesToShow={1.6} slidesToScroll={1} infinite={false}>
          {Boolean(places) && places.map((place) => <PlaceBox place={place} key={place.id} />)}
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
