import React from 'react';
import './Tickets.css';

export const Tickets = ({ state, send }) => {

  const finish = () => {
    send('FINISH');

  };

  return (
    <div className='Tickets'>
      <p className='Tickets-description description'>Gracias por volar con book a fly 💚</p>
      <div className='Tickets-ticket'>
        <div className='Tickets-country'>Colombia</div>
        <div className='Tickets-passengers'>
          <span>✈</span>
          {
            //console.log(state.context.passengers)
            state.context.passengers.map((dato) => {
              return <p key={dato}>{dato}</p>
            })
          }
        </div>
      </div>
      <button onClick={finish} className='Tickets-finalizar button'>Finalizar</button>
    </div>
  );
}; 