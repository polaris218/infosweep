import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { reduxStore, history } from './store/createStore';
import AppContainer from './containers/AppContainer';
import ReactGA from 'react-ga';
import pace from 'pace';

// ========================================================
// Browser History Setup
// ========================================================
//const browserHistory = useRouterHistory(createBrowserHistory)({
  //basename: __BASENAME__
//})

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.

//const initialState = {}

//const store = createStore(initialState, browserHistory)
//const history = syncHistoryWithStore(browserHistory, store, {
  //selectLocationState: (state) => state.router
//})

// ========================================================
// Developer Tools Setup
// ========================================================
//if (__DEBUG__) {
  //if (window.devToolsExtension) {
    //window.devToolsExtension.open()
  //}
//}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = (routerKey = null) => {
  const routes = require('./routes/index').default(reduxStore)
  ReactGA.initialize('UA-108221574-1');

  const logPageView = () => {
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  ReactDOM.render(
    <AppContainer
      store={reduxStore}
      history={history}
      routes={routes}
      logPageView={logPageView}
      routerKey={routerKey}
    />,
    MOUNT_NODE
  )
}

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react').default

    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
  }
  render = () => {
    try {
      renderApp(Math.random())
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept(['./routes/index'], () => render())
}

// ========================================================
// Go!
// ========================================================
pace.start();
render()
