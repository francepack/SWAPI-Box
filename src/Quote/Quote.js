import React from 'react'
import PropTypes from 'prop-types'

const Quote = (props) => {
  
  return(
    <div>
      <p>{props.message.quote}</p>
      <p>{props.message.title}</p>
      <p>{props.message.date}</p>
    </div>  
  )
}

Quote.propTypes = {
  message: PropTypes.object.isRequired
}

export default Quote