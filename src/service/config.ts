import axios from 'axios';
import { getItem } from '../utils';

const token = getItem('clientToken');

export const url: any = process.env.REACT_APP_BASE_URL || "http://localhost:3000/api";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3000/api";
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.common['Content-Type'] = `application/json`;
export default axios;




