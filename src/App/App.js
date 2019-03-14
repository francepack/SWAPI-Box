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
        .then(people => this.setState({people}))
        .then(() => this.setState({ display: 'people' }))
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

  // fetchInfo = (people) => {
  //   let peopleInfo = people.results.map(person => {
  //     this.getHomeInfo(person);
  //     this.getSpeciesInfo(person);

  //     return { name: person.name, home: home.name, species: species.name, pop: homeInfo.pop, fav: false}
  //   })
  //   this.setState({ people: peopleInfo })
  // }

  getHomeInfo = (person) => {
    return fetch(person.homeworld)
      .then(response => response.json())
      .then(home => ({...home}))
      .catch(error => this.setState({ error: error.message })) 
  }

  getSpeciesInfo = (person) => {
    return fetch(person.species)
      .then(response => response.json())
      .then(species => ({...species}))
      .catch(error => this.setState({ error: error.message })) 
  }

  getPlanets = () => {
    if (!this.state.Planets.length) {
      const planetUrl = 'https://swapi.co/api/planets'
      fetch(planetUrl)
        .then(response => response.json())
        .then(result => this.setState({ planets: result.results }))
        .catch(error => this.setState({ error: error.message }))
    }
  }

  getVehicles = () => {
    if (!this.state.vehicles.length) {
      const vehicleUrl = 'https://swapi.co/api/vehicles'
      fetch(vehicleUrl)
        .then(response => response.json())
        .then(result => this.setState({ vehicles: result.results }))
        .catch(error => this.setState({ error: error.message }))
    }
  }

  viewFavorites = () => {

  }

  addFavorite = () => {

  }

  render() {
    console.log(this.state.people)
    console.log(this.state.display)

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