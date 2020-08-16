import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Header } from './components';
import { MainPage, IntroPage, InfoPage } from './containers';
import './App.css';

interface Props {
  history: any;
}

function App(props: Props): JSX.Element {
  return (
    <div className="App">
      <ConnectedRouter history={props.history}>
        <Header history={props.history} />
        <Switch>
          <Route exact path="/" component={MainPage} history={props.history} />
          <Route exact path="/intro" component={IntroPage} history={props.history} />
          <Route exact path="/info" component={InfoPage} />
          <Redirect exact to="/intro" />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
