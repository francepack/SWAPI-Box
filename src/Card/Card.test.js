import React from 'react';
import Card from './Card';
import { shallow } from 'enzyme';

describe('card', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Card />
    )
  });  
  it("should match snapshot when there is no display state", () => {
    expect(wrapper).toMatchSanpshot()
  });
  it("should match snapshot when display is people", () => {
    wrapper.setProps()

  });
  it("should match snapshot when display is planets", () => {

  });
  it("should match snapshot when display is vehicles", () => {

  });
  it("should match snapshot when display is favorites", () => {

  });

});