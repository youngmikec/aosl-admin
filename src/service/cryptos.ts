import axios, { url } from "./config";
// axios.defaults.withCredentials = true;

// const url = "https://generate-api.onrender.com/api";
// const url = "http://localhost:3000/api";
    

export const RETRIEVE_CRYPTOS = async (query: string = '') => {
    let uri: string = `${url}/cryptos/${query}`;
    return axios.get(uri);
}

export const RETRIEVE_CRYPTOS_PUBLIC = async (query: string = '') => {
    let uri: string = `${url}/cryptos/public/${query}`;
    return axios.get(uri);
}

export const CREATE_CRYPTO = async (data: any) => {
    let uri: string = `${url}/cryptos`;
    return axios.post(uri, data)
}

export const UPDATE_CRYPTO = async (id: string, data: any) => {
    let uri: string = `${url}/cryptos/${id}`;
    return axios.put(uri, data);
}

export const DELETE_CRYPTO = async (id: string) => {
    let uri: string = `${url}/cryptos/${id}`;
    return axios.delete(uri);
}
