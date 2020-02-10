import axios from 'axios'

const xhrFactory = token => {
  if (token) {
    axios.defaults.headers['x-access-token'] = token
  }

  return {
    get,
    post,
    put
  }

  function get(url) {
    return axios.get(url)
  }

  function post(url, data) {
    return axios.post(url, data)
  }

  function put(url, data) {
    return axios.put(url, data)
  }
}

export default xhrFactory
