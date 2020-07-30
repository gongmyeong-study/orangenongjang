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
        <Route exact path={["/", "/main"]} render={(props) => <Main {...props}/>} />
        <Route exact path="/signup" render={(props) => <SignUp {...props}/>} />
        <Route exact path="/info" component={Info} />
      </ConnectedRouter>
    </div>
  );
}

export default App;
