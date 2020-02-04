import axios from 'axios'

// @todo get this from somewhere
const access_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwidXNlcm5hbWUiOiJhZG1pbiIsInVzZXJpZCI6IjVlMzg5ZDk0ZWQ3ZTBhNDY3NmJjMmFmNyIsIm5hbWUiOiJBZG1pbiIsImlhdCI6MTU4MDc3NDQ2OSwiZXhwIjoxNTgzMzY2NDY5fQ.s2lGGoNZHPHYPFSEnkgDxG-ftr76cDnCWgINybjz3nw';

// axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
axios.defaults.headers['x-access-token'] = access_token

function xhrFactory() {
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

export {
  xhrFactory
}
