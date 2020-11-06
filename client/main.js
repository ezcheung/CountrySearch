import ReactDOM from 'react-dom';

import React from 'react';
import App from './components/app.js';
import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render((
  <BrowserRouter>
  	<Route path="/" component={App}/>
  </BrowserRouter>),
  document.getElementById('app'));