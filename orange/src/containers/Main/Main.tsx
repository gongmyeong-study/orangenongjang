import React from 'react';
<<<<<<< Updated upstream

function Main() {
  return <h1>Main page</h1>
=======
import NecessityList from '../../components/Necessity/NecessityList'
import { createGlobalStyle } from 'styled-components';
import NecessityTemplate from '../../components/Necessity/NecessityTemplate';
import NecessityHead from '../../components/Necessity/NecessityHead';
import NecessityCreate from '../../components/Necessity/NecessityCreate';
import { NecessityProvider } from '../../components/Necessity/NecessityContext';


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
      <NecessityProvider>
        <NecessityTemplate>
          <NecessityHead />
          <NecessityList />
          <NecessityCreate />
        </NecessityTemplate>
      </NecessityProvider>
    </React.Fragment>
  )
>>>>>>> Stashed changes
}

export default Main;
