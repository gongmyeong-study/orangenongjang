import React, { Dispatch } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { necessityActions } from '../../../store/actions';

const NecessityItemRemove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F1948A;
    font-size: 20px;
    cursor: pointer;
    &:hover {
        color: #B03A2E;
    }
    display: none;
`;

const NecessityItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    &:hover {
        ${NecessityItemRemove}{
            display: initial;
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
  option: string;
  price: number;
  necessityId: any;
  remove(necessityId: number): any;
}

function NecessityItem(props: Props) {
  function refreshPage() {
    window.alert('삭제 완료!');
    window.location.reload(false);
  }

  return (
    <NecessityItemBlock id={`necessity-item-${props.id}`}>
      <Text>
        {`${props.name}`}
        <span className="option">
          {` ${props.option} / ${props.price}원 `}
        </span>
      </Text>
      <NecessityItemRemove
        onClick={() => { props.remove(props.necessityId); refreshPage(); }}
      >
        <MdDelete />
      </NecessityItemRemove>
    </NecessityItemBlock>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  remove: (necessityId: number): void => dispatch(
    necessityActions.removeNecessity(necessityId),
  ),
});

export default connect(null, mapDispatchToProps)(NecessityItem);
