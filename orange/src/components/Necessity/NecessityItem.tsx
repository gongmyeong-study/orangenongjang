import React from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';

const Remove = styled.div`
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
        ${Remove}{
            display: initial;
        }
    }
`;

interface NecessityItemProps {
  cursor?: any;
  done?: boolean;
}

// const CheckCircle = styled.div<NecessityItemProps>`
//     width: 32px;
//     height: 32px;
//     border-radius: 10px;
//     border: 1px solid #ced4da;
//     font-size: 24px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-right: 20px;
//     cursor: pointer;
//     ${(props) => props.done
//         && css`
//             border: 1px solid #38d9a9;
//             color: #38d9a9;
//     `
// }
// `;

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
  name, option, price,
}: { name: string; option: string; price: number }) {
  return (
    <NecessityItemBlock>
      <Text>
        {name}
        <span className="option">
          {option}
          {' '}
          /
          {' '}
          {price}
          {/* {if option != '' return {option} else ''} */}
        </span>
      </Text>
      <Remove>
        <MdDelete />
      </Remove>
    </NecessityItemBlock>
  );
}

export default React.memo(NecessityItem);
