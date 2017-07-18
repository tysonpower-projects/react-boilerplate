import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import LoginPage from '../../pages/login/page';
import SamplePage from '../../pages/sample/page';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="sample/:id" component={SamplePage} />
  </Route>
);
