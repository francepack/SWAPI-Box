import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { makeFetch } from '../Fetch/Fetch'
import * as api from '../Fetch/Fetch'
import { shallow } from 'enzyme';


describe("App", () => {
  let wrapper;
  let mockUrl;
  let mockData;
  let mockPeople;
  beforeEach(() => {
    wrapper = shallow(
      <App />
    )
  });

  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have default states", () => {
    expect(wrapper.state()).toEqual({
      movieQuote: {}, 
      people: [], 
      planets: [],
      vehicles: [],
      favorites: [],
      display: '',
      error: ''
    });
  });


  describe("getMovieQuote", () => {
    it("should call makeFetch", () => {
      api.makeFetch = jest.fn(() => (Promise.resolve({opening_crawl:'hey', title:'A New Nope', release_date:"Summer of '07"})));
      wrapper.instance().getMovieQuote()
      expect(api.makeFetch).toBeCalled()
    });
    it("should update movieQuote state", async () => {
      const mockMovie = {opening_crawl: 'Galaxy', title: 'A No Hope', release_date: 'Decenever 42, 1901'}
      const resultMovieQuote = {quote: 'Galaxy', title: 'A No Hope', date: 'Decenever 42, 1901'}
      api.makeFetch = jest.fn(() => (Promise.resolve(mockMovie)));
      wrapper.setState({movieQuote: {}})
      expect(wrapper.state("movieQuote")).toEqual({});
      await wrapper.instance().getMovieQuote();
      expect(wrapper.state("movieQuote")).toEqual(resultMovieQuote);
    });

  });
  describe("getPeople", () => {
    // it("should call makeFetch", () => {

    // });
    // it("should call addSpecies", () => {
      
    // });
    // it("should call finalizeData", () => {
      
    // });
    it("should update states people and display", async () => {
      const mockPeopleData = {results: [{name: 'Mason'}, {name: 'Isaac'}]}
      api.makeFetch = jest.fn(() => (Promise.resolve(mockPeopleData)))
      let addHomeworld = jest.fn(() => (Promise.resolve(mockPeopleData)))
      let addSpecies = jest.fn(() => (Promise.resolve(mockPeopleData)))
      let finalizeData = jest.fn(() => (Promise.resolve(mockPeopleData.results)))
      expect(wrapper.state("people")).toEqual([]);
      expect(wrapper.state("display")).toEqual('');
      await wrapper.instance().getPeople()
      expect(wrapper.state("display")).toEqual('people');    
      expect(wrapper.state("people")).toEqual( [{name: 'Mason'}, {name: 'Isaac'}]);
    });
  });
  describe("addHomeworld", async () => {
    it("should add properties of homeworld and population to each obj in array", async () => {
      mockData = {results: [{name: 'Mason'}, {name: 'Isaac'}]};
      let fetchData = {name: 'Mars', population: 100000};
      let endData = [{name: 'Mason', homeworld: 'Mars', population: 100000}, {name: 'Isaac', homeworld: 'Mars', population: 100000}];
      api.makeFetch = jest.fn(() => (Promise.resolve(fetchData)))
      const people = await wrapper.instance().addHomeworld(mockData)
      expect(people).toEqual(endData)
    });
  });
  describe("addSpecies",  () => {
    it("should add properties species and category to each obj in arr", () => {
      mockData = [{name: 'Mason'}, {name: 'Jessica'}];
      let fetchSpecies = {name: 'kobold'};
      let endSpecies = [{name: 'Mason', species: 'kobold', category:'person'}, {name: 'Jessica', species: 'kobold', category:'person'}];
      api.makeFetch = jest.fn(() => (Promise.resolve(fetchSpecies)))
      const result =  wrapper.instance().addSpecies(mockData)
      expect(result).toEqual(endSpecies)
    });
  });
  describe("getPlanets", () => {
    // it("should call makeFetch", () => {
      
    // });
    // it("should call addResidents", () => {
      
    // });
    it("should update state planets and display", () => {
      
    });
  });
  describe("addResidents", () => {

  });
  describe("getResidents", () => {

  });
  describe("getVehicles", () => {
    it("should call makeFetch", () => {
      
    });
    it("should call finalizeData", () => {
      
    });
    it("should update state vehicles and display", () => {
      
    })
  });
  describe("finalizeData", () => {

  });
  describe("", () => {

  });
});  
