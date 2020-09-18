import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home'
import store from './redux/store'
import {Provider} from 'react-redux'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
