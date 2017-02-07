import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import LoginPage from '../../pages/login/page';
import ViewPage from '../../pages/view/page';
import SpikePage from '../../pages/spike/page';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="spike/:id" component={SpikePage} />
    <Route path="view/:id" component={ViewPage} />
  </Route>
);
