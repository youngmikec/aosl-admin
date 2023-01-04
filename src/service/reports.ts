import axios, { url } from './config';
    

export const RETRIEVE_APP_REPORTS = async () => {
    let uri: string = `${url}/reports/`;
    return axios.get(uri);
}