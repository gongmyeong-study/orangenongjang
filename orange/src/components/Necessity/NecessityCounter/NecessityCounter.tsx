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
  houseId: number;
  necessityId: number;
  count: number;
  onCountNecessityHouse(houseId: number, necessityId: number, count: number): any;
}

function NecessityCounter(props: Props) {
  return (
    <NecessityItemBlock key={props.key}>
      <table>
        <td>
          <div>
            <button
              type="button"
              onClick={() => {
                props.onCountNecessityHouse(props.houseId, props.necessityId, props.count + 1);
                window.location.reload();
              }}
            >
              +
            </button>
          </div>

          <div>
            <NecessityItemCount
              onSubmit={() => props.onCountNecessityHouse(
                props.houseId, props.necessityId, props.count,
              )}
            >
              { `${props.count}`}
            </NecessityItemCount>
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                props.onCountNecessityHouse(props.houseId, props.necessityId, props.count - 1);
                window.location.reload();
              }}
            >
              -
            </button>
          </div>
        </td>

      </table>
    </NecessityItemBlock>

  );
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onCountNecessityHouse: (houseId: number, necessityId: number, count: number): void => dispatch(
    necessityActions.countNecessityHouse(houseId, necessityId, count),
  ),
});

export default connect(null, mapDispatchToProps)(NecessityCounter);
