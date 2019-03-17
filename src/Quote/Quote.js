import React from 'react'
import PropTypes from 'prop-types'

const Quote = (props) => {
  
  return(
    <div className='quote-box'>
      <div className='crawl'>
        <p className='quote-movie'>{props.message.title}</p>
        <p className='quote-year'>{props.message.date}</p>
        <p className='quote'>{props.message.quote}</p>
      </div>
    </div>  
  )
}

Quote.propTypes = {
  message: PropTypes.object.isRequired
}

export default Quote