import React from 'react'
import PropTypes from 'prop-types'

const Header = (props) => {

  return(
    <div className='header'>
      <h1>SWAPI - box</h1>
      <button className='display-fav'>View {props.favCount} Favorites </button>
    </div>
  )
}

Header.propTypes = {
  viewFavorites: PropTypes.func.isRequired,
  favCount: PropTypes.number.isRequired
}
export default Header