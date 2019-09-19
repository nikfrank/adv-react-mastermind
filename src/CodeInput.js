import React from 'react';

const CodeInput = ({ code=[1,2,3,4], onChange, colors=6 })=> (
  <div className='CodeInput'>{
    code.map((dot, index)=>(
      <div key={index} className={'dot-'+dot}>
        <button className={'up'+index} onClick={()=> onChange(
            code.map((d, i)=> i === index ? (d+1)%colors : d)
        )}>
          up
        </button>
        <button className={'dn'+index} onClick={()=> onChange(
            code.map((d, i)=> i === index ?
                              (d-1+colors) % colors : d)
        )}>
          dn
        </button>
      </div>
    ))
  }</div>
);

  export default CodeInput;
