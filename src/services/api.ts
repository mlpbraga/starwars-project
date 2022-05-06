import { setupCache } from 'axios-cache-adapter';
import axios from 'axios';

const cache = setupCache({
  maxAge: 30 * 60 * 1000,
  debug: true,
  exclude: {
    query: false,
  },
});

const api = axios.create({
  baseURL: 'https://swapi.dev/api/',
  adapter: cache.adapter,
});

export default api;
