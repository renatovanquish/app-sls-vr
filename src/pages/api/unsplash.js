/* eslint-disable import/no-anonymous-default-export */
const API_CLIENTID = 'BFb8-OKN4dsLq-K5t0o0JdsfvYrrfdLGyQdtX98r9JE'
const API_URL = `https://api.unsplash.com/search/photos?page=1&per_page=50&client_id=${API_CLIENTID}`

export default {
  async search(imageSearch) {
    const url = `${API_URL}&query=${imageSearch}`
    const response = await fetch(url)
    const result_1 = await response.json()
    return result_1.results
  },
}
