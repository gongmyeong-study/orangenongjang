import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Header } from './components';
import { MainPage, SignUp, InfoPage } from './containers';
import './App.css';

interface Props {
  history: any;
}

function App(props: Props): JSX.Element {
  return (
    <div className="App">
      <Header history={props.history} />
      <ConnectedRouter history={props.history}>
        <Switch>
          <Route exact path="/" component={MainPage} history={props.history} />
          <Route exact path="/signup" component={SignUp} history={props.history} />
          <Route exact path="/info" component={InfoPage} />
          <Redirect exact to="/signup" />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
