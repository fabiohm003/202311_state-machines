import React, { useState } from 'react';
import './Passengers.css';

export const Passengers = ({ state, send }) => {
  const [value, changeValue] = useState('');

  const onChangeInput = (e) => {
    changeValue(e.target.value);
  }

  const submit = (e) => {
    e.preventDefault();
    send('ADD', {newPassenger: value});
    changeValue('');
  }


    const goToTickets = () => {
      send('DONE');
    };



  return (
    <form onSubmit={submit} className='Passengers'>
      <p className='Passengers-title title'>Agrega a las personas que van a volar ✈️</p>
  
      <select 
        id='Passenger'
        name='Passenger'
      >
        {
          state.context.passengers.map((dato) => {
            //console.log('dato', dato);
            return <option key={dato} value={dato}>{dato}</option>
          })
        }
        
      </select>

      <input 
        id="name" 
        name="name" 
        type="text" 
        placeholder='Escribe el nombre completo' 
        required 
        value={value} 
        onChange={onChangeInput}
      />
      <div className='Passengers-buttons'>
        <button 
          className='Passengers-add button-secondary'
          type="submit"
        >
          Agregar Pasajero
        </button>
        <button
          className='Passenger-pay button'
          type="button"
          onClick={goToTickets}
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
};