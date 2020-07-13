import React from 'react';
import { ConnectedRouter } from 'connected-react-router';

import { Main } from './containers';
import './App.css';

interface Props {
  history: any;
}

function App(props: Props): JSX.Element {
  return (
    <div className="App">
      <ConnectedRouter history={props.history}>
        <Main />
      </ConnectedRouter>
    </div>
  );
}

export default App;
