import React from 'react'
import PropTypes from 'prop-types'

const Card = (props) => {
  let star;
  let card;
  star =
  <div className='star' onClick={props.toggleFav}>
    {props.favorite &&
      <img src="https://img.icons8.com/windows/32/FCB001/filled-star.png" />
    }
    {!props.favorite &&
      <img src="https://img.icons8.com/windows/32/0F3D56/filled-star.png" />
    }
  </div>  

  card =
    <div className='card-content'>
      <header>
        <h2>{props.name}</h2>
        <div>{star}</div>
      </header>
      <article>
        {props.species && 
          <p>Species: <span>{props.species}</span></p>
        }
        {props.homeworld && 
          <p>Home: <span>{props.homeworld}</span></p>
        }
        {props.population && 
          <p>Home pop: <span>{props.population}</span></p>
        }
        {props.terrain && 
          <p>Terrain: <span>{props.terrain}</span></p>
        }
        {props.climate && 
          <p>Climate: <span>{props.climate}</span></p>
        }
        {props.model && 
          <p>Model: <span>{props.model}</span></p>
        }
        {props.class && 
          <p>Class: <span>{props.class}</span></p>
        }
        {props.passengers && 
          <p>Passengers: <span>{props.passengers} people</span></p>
        }
        {props.residents && 
          <div>
            <h4>Residents of Note</h4>
            <ul>
              {props.residents.map(resident => {
                return <li key={resident}>{resident}</li>
              })}
            </ul>
          </div>
        }
      </article>
    </div>

  return(
    <div className='card-box'>
      {card} 
    </div>
  )
}

export default Card