import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch, Redirect } from "react-router-dom";

import { Main, SignUp, Info } from "./containers";
import "./App.css";

interface Props {
  history: any;
}

function App(props: Props): JSX.Element {
  return (
    <div className="App">
      <ConnectedRouter history={props.history}>
        <Switch>
          <Route exact path="/main" component={Main} history={props.history} />} />
          <Route exact path="/signup" component={SignUp} history={props.history} />} />
          <Route exact path="/info" component={Info} />
          <Redirect exact to="/signup" />
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
