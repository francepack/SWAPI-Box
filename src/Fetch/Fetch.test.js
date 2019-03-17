import React from 'react';
import { makeFetch } from './Fetch';

describe('makeFetch', () => {
  let mockData;
  let mockUrl;

  beforeEach(() => {
    mockData = [{name: "Mason"}, {name: "MotorMike"}]
    mockUrl = "www.placeholder.com"
    fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    }));
  });

  it("should take expected url", () => {
    makeFetch(mockUrl);
    expect(fetch).toHaveBeenCalledWith(mockUrl)
  });

  it("should return expected data", () => {
    makeFetch(mockUrl)
      .then(data => {
        expect(data).toEqual(mockData);
      });
  });

  it("should throw an error when response is not ok", () => {
    fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
      ok: false
    }));
    makeFetch(mockUrl)
      .catch(error => {
        expect(error.message).toBe('Response not ok');
      });
  });   
});
