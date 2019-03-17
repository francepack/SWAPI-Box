import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { makeFetch } from '../Fetch/Fetch'
import { shallow } from 'enzyme';


describe("App", () => {
  let wrapper;
  let mockUrl;
  let mockData;
  let makeFetch;
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
    // it("should call makeFetch", () => {
    //   wrapper.instance().getMovieQuote(mockUrl)
    //   expect(makeFetch).toBeCalled()
    // });
    it("should update movieQuote state", () => {
      const mockMovie = {opening_crawl: 'Galaxy', title: 'A No Hope', release_date: 'Decenever 42, 1901'}
      const resultMovieQuote = {quote: 'Galaxy', title: 'A No Hope', date: 'Decenever 42, 1901'}
      makeFetch = jest.fn(() => (mockMovie));
      expect(wrapper.state("movieQuote")).toEqual({});
      wrapper.instance().getMovieQuote();
      expect(wrapper.state("movieQuote")).toEqual(resultMovieQuote);
    });

  });
  describe("getPeople", () => {
    // it("should call makeFetch", () => {

    // });
    it("should call addSpecies", () => {
      
    });
    it("should call finalizeData", () => {
      
    });
    it("should update state people and display", () => {
      
    });
  });
  describe('addHomeworld', () => {
    it("should add properties of homeworld and population to each obj in array", async () => {
      mockData = {results: [{name: 'Mason'}, {name: 'Isaac'}]};
      let fetchData = {name: 'Mars', population: 100000};
      let endData = [{name: 'Mason', name: 'Mars', population: 100000}, {name: 'Isaac'}];
      makeFetch = jest.fn(() => fetchData)
      const people = await wrapper.instance().addHomeworld(mockData)
      expect(people).toBe(endData)
    });
  });
  describe('addSpecies', () => {

  });
  describe('getPlanets', () => {
    it("should call makeFetch", () => {
      
    });
    it("should call addResidents", () => {
      
    });
    it("should update state planets and display", () => {
      
    });
  });
  describe('addResidents', () => {

  });
  describe('getResidents', () => {

  });
  describe('getVehicles', () => {
    it("should call makeFetch", () => {
      
    });
    it("should call finalizeData", () => {
      
    });
    it("should update state vehicles and display", () => {
      
    })
  });
  describe('finalizeData', () => {

  });
  describe('', () => {

  });
});  
