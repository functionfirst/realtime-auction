import { apiHost } from '@/lib/env'

const authFactory = http => {
  return {
    authenticate: authenticate,
    register: register
  };

  async function authenticate(email, password) {
    const { data } = await http.post(`${apiHost}/api/authenticate`, { email, password });
    return data;
  }

  async function register(credentials) {
    const { data } = await http.post(`${apiHost}/api/users`, credentials);
    return data
  }
}

export default authFactory
