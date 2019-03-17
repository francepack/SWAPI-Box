import React from 'react'
import Card from '../Card/Card'
import PropTypes from 'prop-types'



const CardContainer = (props) => {
  const cards = props.data.map(item => (<Card key={item.name} {...item} />))
  return(
    <div className='card-container'>
      {cards}
    </div>  
  )
}


export default CardContainer