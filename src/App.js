import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import BaseLayout from './layout/BaseLayout';
import Forest from './categories/Forest';
import Mountain from './categories/Mountain';
import Sports from './categories/Sports';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <BaseLayout>
            <Route exact path="/" render={() => <Redirect to="/forest" />} />
            <Route exact path="/forest" component={Forest} />
            <Route exact path="/mountain" component={Mountain} />
            <Route exact path="/sports" component={Sports} />
          </BaseLayout>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
