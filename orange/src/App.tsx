import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";

import { Main, SignUp, Info } from "./containers";
import "./App.css";

interface Props {
  history: any;
}

function App(props: Props): JSX.Element {
  return (
    <div className="App">
      <ConnectedRouter history={props.history}>
        <Route exact path={["/", "/main"]} component={Main} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/info" component={Info} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
