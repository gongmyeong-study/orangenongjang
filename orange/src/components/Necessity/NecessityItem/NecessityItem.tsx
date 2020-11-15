import React, { Dispatch, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { necessityActions } from '../../../store/actions';
import NecessityUpdateModal from '../NecessityUpdateModal/NecessityUpdateModal';
import { Necessity } from '../../../api';
import { OrangeGlobalState } from '../../../store/state';

const NecessityItemRemove = styled.div`
    display: none;
    align-items: center;
    justify-content: center;
    color: #F1948A;
    font-size: 20px;
    float: right;
    cursor: pointer;
    &:hover {
        color: #B03A2E;
    }
`;

const NecessityItemBlock = styled.div`
    display: inline-flex;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    &:hover {
        ${NecessityItemRemove}{
            display: inline-flex;
            float: right;
        }
    }
`;

const Text = styled.div`
    flex: 1;
    font-size: 21px;
    color: #495057;
    .option {
      color: #868e96;
      font-size: 12px;
    }
}
`;

interface Props {
  necessity: Necessity;
  onRemoveNecessityHouse(houseId: number, necessityId: number): any;
  onUpdateNecessityHouse: (
    houseId: number,
    necessityId: number,
    description: string,
    price?: number) => any;
  updateStatus?: string;
}

function NecessityItem(props: Props) {
  const [showNecessityUpdateModal, setShowNecessityUpdateModal] = useState(false);
  const showUpdateModal = (): void => setShowNecessityUpdateModal(true);
  const restoreUpdateModal = () => {
    setShowNecessityUpdateModal(false);
  };

  const updateNecessityHouse = (houseId: number,
    necessityId: number,
    description: string,
    price?: number) => {
    props.onUpdateNecessityHouse(houseId, necessityId, description, price)
      .then(() => {
        restoreUpdateModal();
      });
  };

  return (
    <NecessityItemBlock id={`necessity-item-${props.necessity.id}`}>
      <div onClick={showUpdateModal}>
        {showNecessityUpdateModal ? (
          <NecessityUpdateModal
            necessity={props.necessity}
            restoreUpdateModal={restoreUpdateModal}
            updateNecessityHouse={updateNecessityHouse}
          />
        ) : null}

        <Text>
          {`${props.necessity.name}`}
          <span className="option">
            <br />
            {` ${props.necessity.count}개 / ${props.necessity.price}원 / ${props.necessity.option} `}
          </span>
        </Text>
      </div>

      <NecessityItemRemove
        onClick={() => {
          props.onRemoveNecessityHouse(props.necessity.house_id, props.necessity.id);
        }}
      >
        <MdDelete />
      </NecessityItemRemove>
    </NecessityItemBlock>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onRemoveNecessityHouse: (houseId: number, necessityId: number): void => dispatch(
    necessityActions.removeNecessityHouse(houseId, necessityId),
  ),
  onUpdateNecessityHouse: (
    houseId: number, necessityId: number, description: string, price?: number,
  ): void => dispatch(
    necessityActions.updateNecessityHouse(houseId, necessityId, description, price),
  ),
});

const mapStateToProps = (state: OrangeGlobalState) => ({
  updateStatus: state.necessity.updateStatus,
});

export default connect(mapStateToProps, mapDispatchToProps)(NecessityItem);
