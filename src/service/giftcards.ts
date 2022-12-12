import axios, { url } from "./config";
    

export const RETRIEVE_GIFTCARDS = async (query: string = '') => {
    let uri: string = `${url}/giftcards/${query}`;
    return axios.get(uri);
}

export const RETRIEVE_GIFTCARDS_PUBLIC = async (query: string = '') => {
    let uri: string = `${url}/giftcards/public/${query}`;
    return axios.get(uri);
}

export const CREATE_GIFTCARD = async (data: any) => {
    let uri: string = `${url}/giftcards`;
    return axios.post(uri, data)
}

export const UPDATE_GIFTCARD = async (id: string, data: any) => {
    let uri: string = `${url}/giftcards/${id}`;
    return axios.put(uri, data);
}

export const DELETE_GIFTCARD = async (id: string) => {
    let uri: string = `${url}/giftcards/${id}`;
    return axios.delete(uri);
}
