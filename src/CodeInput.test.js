import React from 'react';

import './enzyme-config';
import { mount } from 'enzyme';

import CodeInput from './CodeInput';

it('renders the CodeInput', ()=>{
  const p = mount(<CodeInput />);

  expect( p.html() ).toMatch(/div/);
});

it('renders the dots', ()=>{
  const p = mount(<CodeInput />);

  expect( p.html() ).toMatch(/(div class=.*){4}/);
});

it('renders the 8 buttons', ()=>{
  const p = mount(<CodeInput />);

  const buttons = p.find('button');

  expect( buttons ).toHaveLength( 8 );
});

it('calls the onChange', ()=>{
  const onChange = jest.fn();

  const p = mount(<CodeInput code={[1, 2, 3, 4]}
                             colors={6}
                             onChange={onChange} />);

  const buttons = p.find('button');

  expect( buttons ).toHaveLength( 8 );

  expect( p.find('button.up0') ).toHaveLength( 1 );
  expect( p.find('button.dn0') ).toHaveLength( 1 );

  p.find('button.up0').at(0).simulate('click');

  expect( onChange.mock.calls ).toHaveLength( 1 );
  expect( onChange.mock.calls[0][0] ).toEqual( [2, 2, 3, 4] );

  p.find('button.dn0').at(0).simulate('click');

  expect( onChange.mock.calls ).toHaveLength( 2 );
  expect( onChange.mock.calls[1][0] ).toEqual( [0, 2, 3, 4] );

  p.find('button.up1').at(0).simulate('click');
  
  expect( onChange.mock.calls ).toHaveLength( 3 );
  expect( onChange.mock.calls[2][0] ).toEqual( [1, 3, 3, 4] );

  p.find('button.dn1').at(0).simulate('click');

  expect( onChange.mock.calls ).toHaveLength( 4 );
  expect( onChange.mock.calls[3][0] ).toEqual( [1, 1, 3, 4] );
});

it('calls the onChange for edge cases', ()=>{
  const onChange = jest.fn();

  const p = mount(<CodeInput code={[0, 0, 5, 5]} colors={6} onChange={onChange} />);

  const buttons = p.find('button');

  expect( buttons ).toHaveLength( 8 );

  p.find('button.dn0').at(0).simulate('click');

  expect( onChange.mock.calls ).toHaveLength( 1 );
  expect( onChange.mock.calls[0][0] ).toEqual( [5, 0, 5, 5] );

  p.find('button.up2').at(0).simulate('click');

  expect( onChange.mock.calls ).toHaveLength( 2 );
  expect( onChange.mock.calls[1][0] ).toEqual( [0, 0, 0, 5] );

});
