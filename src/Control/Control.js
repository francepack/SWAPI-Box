import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Control = (props) => {
  const { getPeople, getPlanets, getVehicles } = props
  return(
    <div className='btn-container'>
      <button onClick={getPeople}>People</button>
      <button onClick={getPlanets}>Planets</button>
      <button onClick={getVehicles}>Vehicles</button>
    </div>
  )
}

Control.propTypes = {
  getPeople: PropTypes.func.isRequired,
  getPlanets: PropTypes.func.isRequired,
  getVehicles: PropTypes.func.isRequired
}

export default Control