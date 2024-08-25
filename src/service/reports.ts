import axios from './config';
    
const url: string = "http://localhost:3000/api";

export const RETRIEVE_APP_REPORTS = async () => {
    let uri: string = `${url}/reports/`;
    return axios.get(uri);
}