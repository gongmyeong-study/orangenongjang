import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import { History } from 'history';

import { Header } from './components';
import {
  MainPage, IntroPage, InfoPage, HousePage,
} from './containers';
import './App.css';

interface Props {
  history: History;
}

function App(props: Props): JSX.Element {
  return (
    <div className="App">
      <ConnectedRouter history={props.history}>
        <Header history={props.history} />
        <Switch>
          <Route exact path="/" component={HousePage} hisory={props.history} />
          <Route exact path="/main/:id" component={MainPage} history={props.history} />
          <Route exact path="/intro" component={IntroPage} history={props.history} />
          <Route exact path="/info" component={InfoPage} />
          <Route exact path="/house" component={HousePage} history={props.history} />
          <Redirect exact to="/intro" />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
