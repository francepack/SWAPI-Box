import React from 'react'
import PropTypes from 'prop-types'

const Header = (props) => {

  return(
    <header>
      <h1><span>SWAPI</span> - box</h1>
      <button onClick={props.viewFavorites} className='display-fav'>View <span>{props.favCount}</span> Favorites </button>
    </header>
  )
}

Header.propTypes = {
  viewFavorites: PropTypes.func.isRequired,
  favCount: PropTypes.number.isRequired
}
export default Header