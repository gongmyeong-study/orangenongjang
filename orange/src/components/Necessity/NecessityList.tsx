import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { necessityStatus } from '../../constants/constants';
import { necessityActions } from '../../store/actions';
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
  var necessities = props.necessities;

  return (
    <NecessityListBlock>
      {necessities.map((necessity: any) => (
        <NecessityItem
          key={necessity.id}
          id={necessity.id}
          text={necessity.text}
          done={necessity.done}
        />
      ))}
    </NecessityListBlock>
  )
}

const mapStateToProps = (state: any) => ({
  necessities: state.necessity.necessities,
});

export default connect(mapStateToProps)(NecessityList);
