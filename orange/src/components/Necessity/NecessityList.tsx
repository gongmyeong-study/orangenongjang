import React from 'react';
import styled from 'styled-components';
import NecessityItem from './NecessityItem';
import { useNecessityState } from './NecessityContext';


const NecessityListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;


interface INecessityListProps {
  key: number;
  id: number;
  text: string;
  done: boolean;
}

function NecessityList() {
  const Necessities = useNecessityState();

  return (
    <NecessityListBlock>
      {Necessities.map(Necessity => (
        <NecessityItem
          key={Necessity.id}
          id={Necessity.id}
          text={Necessity.text}
          done={Necessity.done}
        />
      ))}
    </NecessityListBlock>
  )
}


export default NecessityList;
