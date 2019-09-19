import { createStore } from 'redux';


export const initState = {
  code: [1, 2, 3, 4],
  colors: 6,
};

export const reducers = {
  setCode: (state, action)=> ({
    ...state,
    code: action.payload,
  }),
};

export const actions = {
  setCode: code=> ({ type: 'setCode', payload: code }),
};

export const identity = i=> i;


const reducer = (state = initState, action)=> (
  reducers[action.type] || identity
)(state, action);

export const store = createStore(reducer);
