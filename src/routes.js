import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Revenue from './pages/Revenue';
import Commitment from './pages/Commitment';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={() => <Home />} />
      <Route exact path='/calculate/revenue' component={() => <Revenue />} />
      <Route exact path='/calculate/commitment' component={() => <Commitment /> } />
    </Switch>
  </Router>
);

export default Routes;
