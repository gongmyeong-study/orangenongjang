import React from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';

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

function NecessityItem({
  id, name, option, price,
}: { id: number; name: string; option: string; price: number }) {
  return (
    <NecessityItemBlock id={`necessity-item-${id}`}>
      <Text>
        {`${name}`}
        <span className="option">
          {` ${option} / ${price}원 `}
        </span>
      </Text>
      <NecessityItemRemove>
        <MdDelete />
      </NecessityItemRemove>
    </NecessityItemBlock>
  );
}

export default React.memo(NecessityItem);
