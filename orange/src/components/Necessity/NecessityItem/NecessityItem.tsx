import React, {
  Dispatch, useEffect, useState, useReducer,
} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { MdDelete } from 'react-icons/md';
import { necessityActions } from '../../../store/actions/index';
import { necessityConstants } from '../../../store/actions/actionTypes';

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
  option: string;
  price: number;
  necessityUserId: number;
  count: number;
  necessities: any;
  onIncrease?(necessityUserId: number, count: number): any;
  onDecrease?(necessityUserId: number, count: number): any;
  onRemove?(necessityUserId: number): any;
}

function NecessityItem(props: Props) {
  // const initialState = { count: props.count };
  // function reducer(state: any, action: any) {
  //   switch (action.type) {
  //     case necessityConstants.COUNT_INCREASE:
  //       return { count: state.count + 1 };
  //     case necessityConstants.COUNT_DECREASE:
  //       return { count: state.count - 1 };
  //     default:
  //       throw new Error();
  //   }
  // }
  // const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(initialState, props.count);

  const [count, setCount] = useState<number>(props.count);
  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);

  useEffect(() => {
    // 이 함수는 render 가 마치고 난 다음에 실행됩니다!
    console.log('rendered:', count, props.count);
  });

  return (
    <NecessityItemBlock id={`necessity-item-${props.id}`}>
      {console.log('2222', props)}
      <Text>
        {`${props.name}`}
        <span className="option">
          <br />
          {` ${props.option} / ${props.price}원 `}
        </span>
      </Text>
      <NecessityItemRemove
        onClick={() => {
          if (props.onRemove) {
            props.onRemove(props.necessityUserId);
          }
        }}
      >
        <MdDelete />
      </NecessityItemRemove>

      {/* <button
        type="button"
        onClick={() => dispatch({ type: necessityConstants.COUNT_INCREASE })}
      >
        +
      </button>
      {state.count}
      <button
        type="button"
        onClick={() => dispatch({ type: necessityConstants.COUNT_DECREASE })}
      >
        -
      </button> */}

      <button
        type="button"
        onClick={() => {
          // onIncrease();
          if (props.onIncrease) {
            props.onIncrease(props.necessityUserId, props.count + 1);
          }
        }}
      >
        +
      </button>
      <div>{count}</div>
      <button
        type="button"
        onClick={() => {
          onDecrease();
          // if (props.onDecrease) {
          //   props.onDecrease(props.necessityUserId, props.count - 1);
          // }
        }}
      >
        -
      </button>
    </NecessityItemBlock>
  );
}

const mapStateToProps = (state: any) => ({
  necessities: state.necessity.necessities,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onRemove: (necessityUserId: number): void => dispatch(
    necessityActions.removeNecessity(necessityUserId),
  ),
  onIncrease: (necessityUserId: number, count: number): void => dispatch(
    necessityActions.countNecessity(necessityUserId, count),
  ),
  onDecrease: (necessityUserId: number, count: number): void => dispatch(
    necessityActions.countNecessity(necessityUserId, count),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(NecessityItem);
