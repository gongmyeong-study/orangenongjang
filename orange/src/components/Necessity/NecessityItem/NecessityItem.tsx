import React, { Dispatch } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { necessityActions } from '../../../store/actions';

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
  key: number;
  id: number;
  name: string;
  count: number;
  description: string;
  option: string;
  price?: number;
  houseId: number;
  necessityId: number;
  onRemoveNecessityHouse(houseId: number, necessityId: number): any;
}

function NecessityItem(props: Props) {
  return (
    <NecessityItemBlock id={`necessity-item-${props.necessityId}`}>
      <Text>
        {`${props.name}`}
        <span className="option">
          <br />
          {` ${props.count}개 / ${props.price}원 / ${props.option} `}
        </span>
      </Text>
      <NecessityItemRemove
        onClick={() => {
          props.onRemoveNecessityHouse(props.houseId, props.necessityId);
          window.location.reload();
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
});

export default connect(null, mapDispatchToProps)(NecessityItem);
