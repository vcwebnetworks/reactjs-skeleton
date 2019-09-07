import axios from 'axios';

import { BACKEND_URL } from '../config/constants';

export default axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
