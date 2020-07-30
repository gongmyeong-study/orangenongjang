import React from 'react';
import NecessityList from '../../components/Necessity/NecessityList'
import { createGlobalStyle } from 'styled-components';
import NecessityTemplate from '../../components/Necessity/NecessityTemplate';
import NecessityHead from '../../components/Necessity/NecessityHead';
import NecessityCreate from '../../components/Necessity/NecessityCreate';


const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function Main() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <h1>Main page</h1>
        <NecessityTemplate>
          <NecessityHead />
          <NecessityList />
          <NecessityCreate />
        </NecessityTemplate>
    </React.Fragment>
  )
}

export default Main;
