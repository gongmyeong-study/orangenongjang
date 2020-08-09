import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import NecessityItem from './NecessityItem';

const NecessityListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

interface Props {
  necessities: any;
}

function NecessityList(props: Props) {
  const { necessities } = props;

  return (
    <NecessityListBlock>
      {necessities.map((necessity: any) => (
        <NecessityItem
          name={necessity.name}
          option={necessity.option}
        />
      ))}
    </NecessityListBlock>
  );
}

const mapStateToProps = (state: any) => ({
  necessities: state.necessity.necessities,
});

export default connect(mapStateToProps)(NecessityList);
