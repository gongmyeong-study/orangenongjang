import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F1948A;
    font-size: 24px;
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
        ${Remove}{
            display: initial;
        }
    }
`;

interface NecessityItemProps {
  cursor?: any;
  done?: boolean;
}

const CheckCircle = styled.div<NecessityItemProps>`
    width: 32px;
    height: 32px;
    border-radius: 10px;
    border: 1px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    ${(props) => props.done
        && css`
            border: 1px solid #38d9a9;
            color: #38d9a9;
    `
}
`;

interface TextProps {
  color?: string;
  done?: boolean;
}

const Text = styled.div<TextProps>`
    flex: 1;
    font-size: 21px;
    color: #495057;
    ${(props) => props.done
        && css`
            color: #ced4da;
        `
}
`;

function NecessityItem({ id, done, text }: { id: number; done: boolean; text: string }) {
  return (
    <NecessityItemBlock id={`necessity-item-${id}`}>
      <CheckCircle done={done}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove>
        <MdDelete />
      </Remove>
    </NecessityItemBlock>
  );
}

export default React.memo(NecessityItem);
