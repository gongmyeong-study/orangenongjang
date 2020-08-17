import React, { Dispatch } from 'react';
import { MdDelete } from 'react-icons/md';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { necessityActions } from '../../../store/actions';
import './NecessityItem.css';

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F1948A;
    font-size: 21px;
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
        font-weight: bold;
        cursor: pointer;
        ${Remove}{
            display: initial;
        }
    }
`;

interface Props {
  cursor?: any;
  done?: boolean;
  id: number;
  name: string;
  option: string;
  price: number;
  remove(id: number): any;
}

function NecessityItem(props: Props) {
  return (
    <NecessityItemBlock id={`necessity-item-${props.id}`}>
      {/* 이 자리에 Counter 넣을 것! */}
      <div className="necessity-text">
        {`${props.name}`}
        <span className="necessity-option">
          {` ${props.option} / ${props.price}원 `}
        </span>
      </div>
      <Remove onClick={() => props.remove(props.id)}>
        <MdDelete />
      </Remove>
    </NecessityItemBlock>

  // <div
  //   className="necessity-item-block"
  //   id={`necessity-item-${props.id}`}
  // >
  //   {/* 이 자리에 Counter 넣을 것! */}
  //   <div className="necessity-text">
  //     {`${props.name}`}
  //     <span className="necessity-option">
  //       {` ${props.option} / ${props.price}원 `}
  //     </span>
  //   </div>
  //   <button
  //     className="necessity-remove-button"
  //     style={{ background: 'none', border: 'none' }}
  //     type="submit"
  //     onClick={() => props.remove()}
  //   >
  //     <MdDelete />
  //   </button>
  // </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  remove: (id: number): void => dispatch(
    necessityActions.removeNecessity(id),
  ),
});

const mapStateToProps = (state: any) => ({
  removeStatus: state.necessity.removeStatus,
  me: state.user.me,
});

export default connect(mapStateToProps, mapDispatchToProps)(NecessityItem);
