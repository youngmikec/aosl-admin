import axios, { url } from './config';


// const url: string | undefined = process.env.REACT_APP_BASE_URL;

export const RETREIVE_AIRTIME = async (query: string = '') => {
    return axios.get(`${url}/airtime/${query}`);
};

export const CREATE_AIRTIME = async (data: {[key: string]: any}) => {
    return axios.post(`${url}/airtime`, data);
};

export const UPDATE_AIRTIME = async (id: string, data: {[key: string]: any}) => {
    return axios.put(`${url}/airtime/${id}`, data);
};
export const DELETE_AIRTIME = async (id: string) => {
    return axios.delete(`${url}/airtime/${id}`);
};