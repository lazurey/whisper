import _ from 'lodash'

import lodashDeep from 'lodash-deep'
_.mixin(lodashDeep);

import React from 'react'

import {
  Home,
  PicShare
} from './pages'

import {
  run,
  Route,
  NotFoundRoute,
  DefaultRoute,
  RouteHandler
} from 'react-router'

const App = React.createClass({
  render() {
    return (
      <RouteHandler {...this.props}/>
    );
  }
});

const rootRoutes = (
  <Route name='app' path="/" handler={App} alt='Home'>
    <DefaultRoute handler={Home}/>
    <Route name="picshare" handler={PicShare} path="/share/:uid/:pid" />
  </Route>
);

run(rootRoutes, function (Handler, state) {
  var params = state.params;
  React.render(<Handler params={params} />, document.body);
});
