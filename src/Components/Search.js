import React, { useState } from 'react';
import './Search.css';

export const Search = ({ state, send }) => {
  const [flight, setFlight] = useState('');

  const handleSelectChange = (event) => {
    setFlight(event.target.value);
  };


  const goToPassengers = () => {
    send('CONTINUE', {selectedCountry: flight});
  };



  
  return (
    <div className='Search'>
      <p className='Search-title title'>Busca tu destino</p>

      {
      <select id="country" className='Search-select' value={flight} onChange={handleSelectChange}>
        <option value="" disabled defaultValue>Escoge un país</option>
        { state.context.countries.length > 0 &&  
          state.context.countries.map((dato) => {
            //console.log(dato.name.common)
            return <option value={dato.name.common} key={dato.name.common}>{dato.name.common}</option>
          })

        }
      </select>
      }
      <button disabled={flight === ''} className='Search-continue button' onClick={goToPassengers} >Continuar</button>
    </div>
  );
}; 