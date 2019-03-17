export const makeFetch = (url) => {
  return fetch(url)
    .then(response => {
      if(!response.ok) {
        throw new Error('No response')  
      }
      return response.json()
    })
  }