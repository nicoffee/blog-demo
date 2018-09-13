import express from 'express';
// import cors from 'cors';

import React from 'react';
import Loadable from 'react-loadable';
import {getBundles} from 'react-loadable/webpack';
import {renderToString} from 'react-dom/server';
import {StaticRouter, matchPath} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {ServerStyleSheet} from 'styled-components';

// import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackConfig from '../../webpack/webpack.server';

import App from '../browser/components/App';
import rootReducer from '../browser/reducers';
import routes from '../browser/routes';
import createHtml from './createHtml';
import stats from '../../public/react-loadable.json';

const sendHtml = (res, url, store) => {
  const context = {};
  const sheet = new ServerStyleSheet();
  let modules = [];

  const markup = renderToString(
    sheet.collectStyles(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <StaticRouter context={context} location={url}>
          <App store={store} />
        </StaticRouter>
      </Loadable.Capture>
    )
  );

  const bundles = getBundles(stats, modules);
  const styleTags = sheet.getStyleTags();
  let preloadedState = store.getState();

  preloadedState = store.getState();

  return res.send(createHtml(markup, styleTags, preloadedState, bundles));
};

// const compiler = webpack(webpackConfig);

const app = express();

// // app.use(cors());

// app.use(
//   webpackDevMiddleware(compiler, {
//     publicPath: webpackConfig.output.publicPath,
//   })
// );

// app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('public'));

app.get('*', (req, res) => {
  const currentRoute = routes.find(route => matchPath(req.url, route)) || {};

  const loadData = currentRoute.loadData
    ? currentRoute.loadData
    : Promise.resolve(null);

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  if (typeof loadData.saga === 'function') {
    sagaMiddleware
      .run(loadData.saga, loadData.action)
      .done.then(() => sendHtml(res, req.url, store));
  } else {
    sendHtml(res, req.url, store);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port: 3000`);
});