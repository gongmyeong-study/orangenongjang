import React, { Dispatch, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { History } from 'history';
import Slider from 'react-slick';
import Modal from 'react-modal';
import { TextField, InputAdornment, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { PlaceBox, PlaceCreateForm } from '../../components';
import { necessityActions } from '../../store/actions';
import { Place } from '../../api';
import { OrangeGlobalState } from '../../store/state';
import './NecessityPage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { createPlace } from '../../store/actions/necessity/necessity';
import { necessityStatus } from '../../constants/constants';

interface Props {
  history: History;
  onGetHouse(houseId: number): void;
  places: Place[];
  houseId: number;
}

interface PlaceCreateFormData {
  name: string;
}

function NecessityPage(props: Props) {
  const [isModalOpen, setModalOpen] = useState(false);

  const { createStatus } = useSelector((state: OrangeGlobalState) => state.necessity);
  const dispatch = useDispatch();

  const fetchHouse = () => {
    props.onGetHouse(props.houseId);
  };

  useEffect(() => {
    fetchHouse();
    if (createStatus === necessityStatus.SUCCESS) {
      setModalOpen(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createStatus]);

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
        <h1 className="NecessityPageBlock">집집</h1>
        <Slider className="slider" dots slidesToShow={1.6} slidesToScroll={1} infinite={false}>
          {Boolean(props.places) && props.places.map((place) => <PlaceBox place={place} />)}
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

const mapStateToProps = (state: OrangeGlobalState) => ({
  places: state.necessity.places,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onGetHouse: (houseId: number) => dispatch(
    necessityActions.getHouse(houseId),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(NecessityPage);
