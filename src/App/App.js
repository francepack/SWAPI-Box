import React, { Component } from 'react'
import '../index.scss'
import Header from '../Header/Header'
import Quote from '../Quote/Quote'
import Control from '../Control/Control'
import CardContainer from '../CardContainer/CardContainer'

export default class App extends Component {
  constructor() {
    super()
    this.state= {
      data: [],
      movieQuote: {},
      people: [],
      planets: [],
      vehicles: [],
      favorites: [],
      display: '',
      error: ''
    }
  }

  componentDidMount() {
    // const url = 'https://swapi.co/api/planets/'
    // fetch(url)
    //   .then(response => response.json())
    //   .then(result => this.setState({data: result.results}))
    this.getMovieQuote();
  }

  getMovieQuote = () => {
    const movieNumber = Math.floor(Math.random() * Math.floor(8));
    const quoteUrl = 'https://swapi.co/api/films/' + movieNumber;
    fetch(quoteUrl)
      .then(response => response.json())
      .then(result => this.setState({ movieQuote: {quote: result.opening_crawl, title: result.title, date: result.release_date} }))
      .catch(error => this.setState({ error: error.message }))
  }

  getPeople = () => {
    if (!this.state.people.length) {
      const peopleUrl = 'https://swapi.co/api/people'
      fetch(peopleUrl)
        .then(response => response.json())
        .then(people => this.fetchHomeInfo(people))
        .then(people => this.fetchSpeciesInfo(people))
        .then(people => this.setState({ people: people, display: 'people' }))
        // .then(() => this.setState({ display: 'people' }))
        .catch(error => this.setState({ error: error.message }))
    } else {
      this.setState({ display: 'people' });
    }
  }

  fetchHomeInfo(people) {
    const promisesHome = people.results.map(person => {
      return fetch(person.homeworld)
        .then(response => response.json())
        .then(result => ({...person, homeworld: result.name, population: result.population}))
    })
    return Promise.all(promisesHome)
  }

  fetchSpeciesInfo(people) {
    const promisesSpecies = people.map(person => {
      return fetch(person.species)
        .then(response => response.json())
        .then(result => ({...person, species: result.name}))
    })
    return Promise.all(promisesSpecies)
  }

  getPlanets = () => {
    if (!this.state.planets.length) {
      const planetUrl = 'https://swapi.co/api/planets'
      fetch(planetUrl)
        .then(response => response.json())
        .then(planets => this.fetchResidents(planets))
        .then(planets => this.setState({ planets: planets, display: 'planets'}))
        .catch(error => this.setState({ error: error.message }))
    } else {
      this.setState({ display: 'planets' });
    }
  }

  fetchResidents(planets) {
    let residents = planets.results.map(planet => {
      if (planet.residents.length) {
        let nameArr = []
        let promisesResidents = planet.residents.map(resident => { 
          return fetch(resident)
            .then(response => response.json())
            .then(result => (nameArr.push(result.name)))
          })
        console.log(promisesResidents)
        return {...planet, residents: nameArr}
        } else {
          return planet;
        }
    })
    return Promise.all(residents)
  }

  getVehicles = () => {
    if (!this.state.vehicles.length) {
      const vehicleUrl = 'https://swapi.co/api/vehicles'
      fetch(vehicleUrl)
        .then(response => response.json())
        .then(vehicles => this.setState({ vehicles: vehicles.results, display: 'vehicles' }))
        .catch(error => this.setState({ error: error.message }))
    } else {
      this.setState({ display: 'vehicles' });
    }
  }

  viewFavorites = () => {

  }

  toggleFavorite = () => {

  }

  render() {
    console.log(this.state.people)
    console.log(this.state.display)
    console.log(this.state.planets)
    console.log(this.state.vehicles)
    return (
      <div className="App">
        <Header viewFavorites={this.viewFavorites}
                favCount={this.state.favorites.length}
        />
        <Quote message={this.state.movieQuote} />
        <Control getPeople={this.getPeople}
                 getPlanets={this.getPlanets}
                 getVehicles={this.getVehicles}           
        />
        <CardContainer data={this.state.data} 
                       addFavorite={this.addFavorite} 
        />
      </div>
    );
  }
}