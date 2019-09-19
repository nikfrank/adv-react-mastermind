import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './enzyme-config';
import { mount } from 'enzyme';

import { Provider } from 'react-redux';
import { store, initState } from './store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
    <Provider store={store}>
      <App />
    </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('changes the code for the user', ()=>{
  const p = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const state = store.getState();

  expect( state.code ).toEqual( initState.code );

  expect( p.find('button') ).toHaveLength( 8 );

  p.find('button.up3').at(0).simulate('click');

  let nextState = store.getState();

  let nextCode = [
    ...initState.code.slice(0,3),
    (initState.code[3] + 1) % initState.colors,
  ];

  expect( nextState.code ).toEqual( nextCode );

  expect( p.find('div.dot-5') ).toHaveLength( 1 );
  

  p.find('button.dn3').at(0).simulate('click');

  nextState = store.getState();

  expect( nextState.code ).toEqual( initState.code );

  p.find('button.dn3').at(0).simulate('click');

  expect( p.find('div.dot-3') ).toHaveLength( 2 );
});


