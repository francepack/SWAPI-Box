import React, { Component } from 'react'
import '../Styles/index.scss'
import { makeFetch } from '../Fetch/Fetch'
import Header from '../Header/Header'
import Quote from '../Quote/Quote'
import Control from '../Control/Control'
import CardContainer from '../CardContainer/CardContainer'

export default class App extends Component {
  constructor() {
    super()
    this.state= {
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
    this.getMovieQuote();
  }

  getMovieQuote = () => {
    const movieNumber = Math.ceil(Math.random() * Math.floor(7));
    const quoteUrl = 'https://swapi.co/api/films/' + movieNumber;
    makeFetch(quoteUrl)
      .then(result => this.setState({ movieQuote: {quote: result.opening_crawl, title: result.title, date: result.release_date} }))
      .catch(error => this.setState({ error: error.message }))
  }

  getPeople = () => {
    if (!this.state.people.length) {
      const peopleUrl = 'https://swapi.co/api/people'
      makeFetch(peopleUrl)
        .then(people => this.addHomeworld(people))
        .then(people => this.addSpecies(people))
        .then(people => this.finalizeData(people))
        .then(people => this.setState({ people: people, display: 'people' }))
        .catch(error => this.setState({ error: error.message }))
    }
  }

  addHomeworld(people) {
    const addedHomeworld = people.results.map(person => {
      return makeFetch(person.homeworld)
        .then(result => ({...person, homeworld: result.name, population: result.population}))
    })
    return Promise.all(addedHomeworld)
  }

  addSpecies(people) {
    const addedSpecies = people.map(person => {
      return makeFetch(person.species)
        .then(result => ({...person, species: result.name, category:'person'}))
    })
    return Promise.all(addedSpecies)  
  }

  //Should I clean my info? More neat to do that in my fetch builds, or outside function?
  //Wondering if I need to normalize what I pass down, or have the card show a line for each key it sees

    finalizeData(arr) {
    const finishedObjects = arr.map(obj => {
      switch (obj.category) {
        case 'person':
          return { name: obj.name, 
            category: obj.category, 
            homeworld: obj.homeworld, 
            population: obj.population, 
            favorite: false, 
            id: Date.now()
          }
        break;
        case 'planet':
          return { name: obj.name, 
            category: obj.category, 
            terrain: obj.terrain, 
            population: obj.population, 
            climate: obj.climate, 
            residents: obj.residents, 
            favorite: false, 
            id: Date.now()
          }
        break;
        case 'vehicle':
          return { name: obj.name, 
            category: obj.category, 
            model: obj.model, 
            class: obj.vehicle_class, 
            passengers: obj.passengers, 
            favorite: false, 
            id: Date.now()
          }
        break;
      }  
    })
    return finishedObjects;
  }

  getPlanets = () => {
    if (!this.state.planets.length) {
      const planetUrl = 'https://swapi.co/api/planets'
      makeFetch(planetUrl)
        .then(planets => this.addResidents(planets))
        .then(planets => this.finalizeData(planets))
        .then(planets => this.setState({ planets: planets, display: 'planets'}))
        .catch(error => this.setState({ error: error.message }))
    } else {
      this.setState({ display: 'planets' });
    }
  }

  addResidents(planets) {
    const addedResidents = planets.results.map(planet => {
      return this.getResidents(planet)
        .then(result => ({...planet, residents: result, category: 'planet' }))
    })
    return Promise.all(addedResidents)
  }

  getResidents(planet) {
    const residents = planet.residents.map(resident => {
      return makeFetch(resident)
        .then(result => (result.name))
    })
    return Promise.all(residents)
  }

  getVehicles = () => {
    if (!this.state.vehicles.length) {
      const vehicleUrl = 'https://swapi.co/api/vehicles'
      makeFetch(vehicleUrl)
        .then(vehicles => (vehicles.results.map(vehicle => ({...vehicle, category: 'vehicle' }))))
        .then(vehicles => this.finalizeData(vehicles))
        .then(vehicles => this.setState({ vehicles: vehicles, display: 'vehicles' }))
        .catch(error => this.setState({ error: error.message }))
    } else {
      this.setState({ display: 'vehicles' });
    }
  }

  viewFavorites = () => {
    this.setState({ display: 'favorites' })
  }

  toggleFavorite = () => {

  }

  render() {
    console.log(this.state.people)
    console.log(this.state.display)
    console.log(this.state.planets)
    console.log(this.state.vehicles)


    const { display, error } = this.state;
    let cardDisplay;

    if (error) {
      cardDisplay = <p>{error}</p>
    } else if (!display) {
      cardDisplay = <p>Select Cool stuff to View</p>
    } else {
      cardDisplay = <CardContainer data={this.state[display]}
                    />
    }

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
        {cardDisplay}
      </div>
    );
  }
}