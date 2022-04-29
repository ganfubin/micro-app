import React from "react";
import ReactDOM from 'react-dom'
import './style.less'
import {registerMicroApps, runMicroApp} from '../../../index'

import App from "./App";

registerMicroApps([
  {name: 'app1', entry: 'http://localhost:8002/'},
  {name: 'app2', entry: 'http://localhost:8003/'}
])

runMicroApp()

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)