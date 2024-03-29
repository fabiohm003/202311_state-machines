import React from 'react';
import { useMachine } from '@xstate/react';
import { Nav } from '../Components/Nav';
import { StepsLayout } from './StepsLayout';
import bookingMachine from '../Machines/bookingMachine';
import './BaseLayout.css';

export const BaseLayout = () => {
  const [state, send] = useMachine(bookingMachine);

  console.log('valor estado:', state.value, state.context);
  //console.log('matches true', state.matches('initial'));
  //console.log('matches false', state.matches('tickets'));
  //console.log('can', state.can('FINISH'));


  return (
    <div className='BaseLayout'>
      <Nav state={state} send={send} />
      <StepsLayout state={state} send={send} />
    </div>
  );
}