import React from 'react'
import PropTypes from 'prop-types'

const Card = (props) => {
  
//can do 'shortcircuit' here
//like if obj has prop.whatev, show if, if now, move on
//{props.homeworld &&}
  let card;
  switch (props.category) {
    case 'person':
      card = 
        <div>
          <header>
            <h2>{props.name}</h2>
            <button></button>
          </header>
          <article>
            <p>{props.homeworld}</p>
            <p>{props.species}</p>
            <p>{props.population}</p>
          </article>
        </div>
      break;
    case 'planet':
    let residents = props.residents.map(resident => {return <li key={resident}>{resident}</li>})
      card =
        <div>
          <header>
            <h2>{props.name}</h2>
            <button></button>
          </header>
          <article>
            <p>{props.terrain}</p>
            <p>{props.population}</p>
          </article>
          <ul>
            {residents}
          </ul>
        </div>
      break;
    case 'vehicle':
      card =
        <div> 
          <header>
            <h2>{props.name}</h2>
            <button></button>
          </header>
          <article>
            <p>{props.model}</p>
            <p>{props.vehicle_class}</p>
            <p>{props.passengers}</p>
          </article>
        </div>
      break;        
  }
  return(
    <div className='card-box'>
      {card}
    </div>  
  )
}

export default Card