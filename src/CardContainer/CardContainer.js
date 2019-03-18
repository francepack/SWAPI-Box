import React from 'react'
import Card from '../Card/Card'
import PropTypes from 'prop-types'



const CardContainer = (props) => {
  const cards = props.data.map(item => (<Card key={item.name} toggleFav={props.toggleFav} {...item} />))
  return(
    <div className='card-container'>
      {cards}
    </div>  
  )
}

CardContainer.propTypes = {
  data: PropTypes.array.isRequired,
  toggleFav: PropTypes.func.isRequired
}


export default CardContainer