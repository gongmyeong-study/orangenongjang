import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { necessityActions } from '../../../store/actions';

const NecessityItemCount = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffa500;
    font-size: 20px;
    cursor: text
    &:hover {
        color: #B03A2E;
    }
`;

const NecessityItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 12px;
    padding-bottom: 12px;
    &:hover {
        ${NecessityItemCount}{
            display: initial;
        }
    }
`;

interface Props {
  key: number;
  necessityUserId: number;
  count: number;
  counter(necessityUserId: number, count: number): any;
}

function NecessityCounter(props: Props) {
  return (
    <div>
      <NecessityItemBlock key={props.key}>
        <NecessityItemCount
          onChange={() => props.counter(props.necessityUserId, props.count)}
        >
          {`${props.count}`}
        </NecessityItemCount>
      </NecessityItemBlock>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  counter: (necessityUserId: number, count: number): void => dispatch(
    necessityActions.countNecessity(necessityUserId, count),
  ),
});

export default connect(null, mapDispatchToProps)(NecessityCounter);
