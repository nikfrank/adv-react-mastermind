import React from 'react';
import './App.css';

import { connect } from 'react-redux';

import { actions } from './store';

import CodeInput from './CodeInput';

const App = ({ code, colors, setCode })=> (
  <div className='App'>
    <CodeInput code={code}
               onChange={setCode}
               colors={colors} />
  </div>
);

export default connect(state=> state, actions)(App);
